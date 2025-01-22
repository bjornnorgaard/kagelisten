<script lang="ts">
    import { onMount } from "svelte";
    import { rawSaints, saints } from "$lib/stores";
    import { textareaCols } from "$lib/constants";

    const testData = "Mandag d. XX/XX\n" +
        "Kage: Ander Åkjær\n" +
        "Kage: Børge Bissen\n" +
        "Kage: Charlie Low\n" +
        "Kage: Dan Tyrel\n" +
        "Kage: Figgo Fiskarl\n" +
        "Kage: George Geoløs\n" +
        "Kage: Hans Hinterseer\n" +
        "Kage: Ivar Vladimir\n" +
        "Kage: Jørgen Utson\n" +
        "Kage:\n" +
        "Frugt:\n" +
        "Frugt:\n" +
        "Frugt:\n";

    onMount(() => parseInput());

    function parseInput() {
        rawSaints.set($rawSaints);
    }

</script>

<label>
    <b on:click={() => rawSaints.set(testData)}>De Artige {$saints.length ? `(${$saints.length})` : ""}</b>
    <textarea rows={textareaCols} bind:value={$rawSaints} on:input={parseInput}></textarea>
</label>
