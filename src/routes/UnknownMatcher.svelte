<script lang="ts">
    import {everyone, rawSaints, unknown} from "$lib/stores";
    import {derived} from "svelte/store";
    import Fuse from "fuse.js";

    let replacements = new Map<string, string>();

    const data = derived([unknown, everyone], ([$unknown, $everyone]) => {
        return $unknown.map((u, _) => {
            return {
                name: u,
                original: u,
                suggestions: findSuggestions(u, $everyone),
            };
        });
    }, []);

    function findSuggestions(name: string, all: string[]): string[] {
        const fuseOptions = {threshold: 0.5};
        const fuse = new Fuse(all, fuseOptions);
        return fuse.search(name).map((r) => r.item);
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

<div class="grid">
    {#each $data as u (u.name)}
        <div>
            <span>Hvem er {u.original}?</span>
            <fieldset class="">
                {#if u.suggestions.length}
                    {#each u.suggestions as s}
                        <label>
                            <input checked={replacements.get(u.original) === s}
                                   on:change={() => suggestionSelected(u.original, s)}
                                   type="radio" name={u.name + s} value={u.name + s}/>
                            <span class:font-bold={replacements.get(u.original) === s}>{s}</span>
                        </label>
                    {/each}
                {:else}
                    <legend><b>Fandt ingen mulige rettelser</b></legend>
                {/if}
            </fieldset>
        </div>
    {/each}
</div>

<button disabled={replacements.size !== $unknown.length} on:click={() => confirmChanges()}>
    Bekræft ændringer og overskriv 'De Artige'
</button>

