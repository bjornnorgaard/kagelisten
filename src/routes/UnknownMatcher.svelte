<script lang="ts">
    import {everyone, unknown} from "$lib/stores";
    import {derived} from "svelte/store";
    import Fuse from "fuse.js";

    // Key is the original name, value is the new name
    let replacements = new Map<string, string>();

    const data = derived([unknown, everyone], ([$unknown, $everyone]) => {
        return $unknown.map((u, i) => {
            return {
                index: i,
                name: u,
                original: u,
                suggestions: findSuggestions(u, $everyone),
            };
        });
    });

    function findSuggestions(name: string, all: string[]): string[] {
        const fuseOptions = {threshold: 0.5,};
        const fuse = new Fuse(all, fuseOptions);
        return fuse.search(name).map((r) => r.item);
    }

    function suggestionSelected(unknownName: string, suggestion: string) {
        replacements = replacements.set(unknownName, suggestion);
    }

</script>

<div class="flex flex-wrap">
    {#each $data as u (u.name)}
        <div class="basis-1/2 p-2">
            {#if replacements.get(u.original) && replacements.get(u.original) !== u.original}
                <b>{replacements.get(u.original)}</b>
                <span class="line-through">{u.original}</span>
            {:else}
                <b>{u.name}</b>
            {/if}

            <br>

            <fieldset>
                {#if u.suggestions.length}
                    <legend><span>Mulige rettelser</span></legend>
                    {#each u.suggestions as s}
                        <label>
                            <input checked={replacements.get(u.original) === s}
                                   on:change={() => suggestionSelected(u.original, s)}
                                   type="radio" name={s} value={s}/>
                            {s}
                        </label>
                    {/each}
                    <label>
                        <input checked={replacements.get(u.original) === u.original}
                               on:change={() => suggestionSelected(u.original, u.original)}
                               type="radio" name={u.original} value={u.original}/>
                        {u.original} (original)
                    </label>
                {:else}
                    <legend><b>Fandt ingen mulige rettelser</b></legend>
                {/if}
            </fieldset>
        </div>
    {/each}
</div>

<br>

<ul class="p-6">
    {#each replacements as [k, v]}
        <li>{k} bliver til "{v}"</li>
    {/each}
</ul>


<button disabled={replacements.size !== $unknown.length}>Bekræft og gem</button>
