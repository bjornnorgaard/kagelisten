<script lang="ts">
    import {onMount} from "svelte";
    import {rawSaints} from "$lib/stores";
    import {textareaCols} from "$lib/constants";

    onMount(() => parseInput());

    function parseInput() {
        rawSaints.set($rawSaints);
    }
</script>

<label class="raw-input-container">
    <span>De Artige</span>
    <textarea rows={textareaCols} bind:value={$rawSaints} on:input={parseInput}></textarea>
</label>
