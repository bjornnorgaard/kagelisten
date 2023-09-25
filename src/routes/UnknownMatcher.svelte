<script lang="ts">
    import { everyone, rawSaints, unknown } from "$lib/stores";
    import { derived } from "svelte/store";
    import Fuse from "fuse.js";
    import { flip } from "svelte/animate";

    let replacements = new Map<string, string>();

    const unknownNamesWithSuggestions = derived([ unknown, everyone ], ([ $unknown, $everyone ]) => {
        let map: { original: string; name: string; suggestions: Suggestion[] }[] = $unknown.map((u, _) => {
            return {
                name: u,
                original: u,
                suggestions: findSuggestions(u, $everyone),
            };
        });
        return map;
    }, []);

    interface Suggestion {
        item: string;
        score: number;
    }

    function findSuggestions(name: string, all: string[]): Suggestion[] {
        const fuseOptions = {
            threshold: 0.5,
            ignoreLocation: true,
            includeScore: true,
        };

        const fuse = new Fuse(all, fuseOptions);

        return fuse.search(name)
            .map(res => ({ item: res.item, score: res.score ?? -1 }))
            .sort((a, b) => a.score - b.score)
            .slice(0, 10);
    }

    function suggestionSelected(unknownName: string, suggestion: string) {
        replacements = replacements.set(unknownName, suggestion);
    }

    function confirmChanges() {
        rawSaints.update((rawSaintsValue) => {
            const copiedRawSaints = rawSaintsValue.split("\n");
            for (let i = 0; i < copiedRawSaints.length; i++) {
                let line = copiedRawSaints[i];
                if (!line.includes(": ")) continue;

                const lineSplit = line.split(":");
                const prefix = lineSplit[0];
                let name = lineSplit[1].trim();

                if (replacements.has(name)) {
                    name = replacements.get(name) ?? name;
                }
                copiedRawSaints[i] = `${prefix}: ${name}`;
            }

            rawSaintsValue = copiedRawSaints.join("\n");
            return rawSaintsValue;
        })
    }

    function addToEveryone(name: string) {
        everyone.update(e => {
            return [ ...e, name ];
        })
    }
</script>

<div class="grid grid-cols-1 place-items-center items-center gap-4 md:grid-cols-2">
    {#each $unknownNamesWithSuggestions as u (u.name)}
        <div class="h-full w-full place-self-center" animate:flip={{duration:500}}>
            <span>Hvem er <b class="text-[--primary]">{u.original}</b>?</span>
            <fieldset class="my-2 ml-2">
                {#if u.suggestions.length}
                    {#each u.suggestions as s (s.item)}
                        <label class="cursor-pointer" animate:flip>
                            <input checked={replacements.get(u.original) === s.item}
                                   on:change={() => suggestionSelected(u.original, s.item)}
                                   type="radio" name={u.name + s.item} value={u.name + s.item}/>
                            <span class:font-bold={replacements.get(u.original) === s.item}>
                                {s.item}
                            </span>
                        </label>
                    {/each}
                {:else}
                    <legend>Fandt ingen mulige rettelser</legend>
                {/if}
            </fieldset>
            <button class="h-fit w-fit py-0 ml-2 outline" on:click={() => addToEveryone(u.original)}>
                '{u.original}' er korrekt
            </button>
        </div>
    {/each}
</div>

<br>

<button disabled={!replacements.size} on:click={() => confirmChanges()}>
    Bekræft ændringer og overskriv 'De Artige'
</button>
