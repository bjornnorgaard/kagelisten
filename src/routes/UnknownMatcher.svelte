<script lang="ts">
    import { everyone, rawSaints, unknown } from "$lib/stores";
    import { derived } from "svelte/store";
    import Fuse from "fuse.js";
    import { slide } from "svelte/transition";
    import { flip } from "svelte/animate";

    let replacements = new Map<string, string>();

    const unknownNamesWithSuggestions = derived([ unknown, everyone ], ([ $unknown, $everyone ]) => {
        return $unknown.map((u, _) => {
            return {
                name: u,
                original: u,
                suggestions: findSuggestions(u, $everyone),
            };
        });
    }, []);

    interface Suggestion {
        item: string;
        score: number;
    }

    function findSuggestions(name: string, all: string[]): Suggestion[] {
        const fuseOptions = { threshold: 0.5, includeScore: true };
        const fuse = new Fuse(all, fuseOptions);
        return fuse.search(name)
            .map(res => ({ item: res.item, score: res.score ?? -1 }))
            .sort((a, b) => a.score - b.score);
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
</script>

<div class="grid grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-3 place-items-center ">
    {#each $unknownNamesWithSuggestions as u (u.name)}
        <div class="place-self-center h-full w-full" in:slide out:slide animate:flip={{duration:300}}>
            <span>Hvem er <b class="text-blue-400">{u.original}</b>?</span>
            <fieldset>
                {#if u.suggestions.length}
                    {#each u.suggestions as s}
                        <label>
                            <input checked={replacements.get(u.original) === s.item}
                                   on:change={() => suggestionSelected(u.original, s.item)}
                                   type="radio" name={u.name + s.item} value={u.name + s.item}/>
                            <span class:font-bold={replacements.get(u.original) === s.item}>{s.item} ({s.score.toPrecision(2)})</span>
                        </label>
                    {/each}
                {:else}
                    <legend><b>Fandt ingen mulige rettelser</b></legend>
                {/if}
            </fieldset>
        </div>
    {/each}
</div>

<button disabled={!replacements.size} on:click={() => confirmChanges()}>
    Bekræft ændringer og overskriv 'De Artige'
</button>

