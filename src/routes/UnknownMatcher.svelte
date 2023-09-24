<script lang="ts">
    import { everyone, unknown } from "$lib/stores";
    import { derived } from "svelte/store";
    import Fuse from "fuse.js";

    // Key is the original name, value is the new name
    let replacements = new Map<string, string>();

    const data = derived([ unknown, everyone ], ([ $unknown, $everyone ]) => {
        return $unknown.map((u, i) => {
            return {
                index: i,
                name: u,
                original: u,
                suggestions: findSuggestions(u, $everyone),
            };
        });
    }, []);

    function findSuggestions(name: string, all: string[]): string[] {
        const fuseOptions = { threshold: 0.5 };
        const fuse = new Fuse(all, fuseOptions);
        return fuse.search(name).map((r) => r.item);
    }

    function suggestionSelected(unknownName: string, suggestion: string) {
        replacements = replacements.set(unknownName, suggestion);
    }

</script>

<div class="flex flex-col gap-4">
    {#each $data as u (u.name)}
        <div>
            <div>
                {#if replacements.get(u.original) && replacements.get(u.original) !== u.original}
                    <span class="opacity-60">{u.original}</span>
                    er faktisk <span class="underline">{replacements.get(u.name)}</span>
                {:else}
                    <span>Hvem er {u.original}?</span>
                {/if}
            </div>

            <fieldset class="mt-2 flex flex-col">
                {#if u.suggestions.length}
                    <legend><span>Mulige rettelser</span></legend>
                    {#each u.suggestions as s}
                        <label>
                            <input checked={replacements.get(u.original) === s}
                                   on:change={() => suggestionSelected(u.original, s)}
                                   type="radio" name={s} value={s}/>
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
