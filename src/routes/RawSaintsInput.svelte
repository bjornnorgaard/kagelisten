<script lang="ts">
    import {onMount} from "svelte";
    import {rawSaints} from "$lib/stores";
    import {textareaCols} from "$lib/constants";

    const testData = "Mandag d. XX/XX\n" +
        "Kage: Rachana Cokkie Cheng\n" +
        "Kage: Marina Samson Slávkap\n" +
        "Kage: Kemuel Misho Hurşit\n" +
        "Kage: Sintija Sid Aleksey\n" +
        "Kage: Artur Ceres Aruna\n" +
        "Kage: Mikhael Bøjsen Hansen\n" +
        "Kage: Emma Jørgensen\n" +
        "Kage: Jørgen Emmason\n" +
        "Kage: Emma\n" +
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
    <b on:click={() => rawSaints.set(testData)}>De Artige</b>
    <textarea rows={textareaCols} bind:value={$rawSaints} on:input={parseInput}></textarea>
</label>
