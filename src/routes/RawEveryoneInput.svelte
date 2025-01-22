<script lang="ts">
    import { everyone } from "$lib/stores";
    import { textareaCols } from "$lib/constants";
    import { onMount } from "svelte";

    let rawEveryone: string = "";

    onMount(() => {
        everyone.subscribe(names => {
            rawEveryone = names.join("\n");
        });
    });

    function parseInput() {
        if (!rawEveryone) return;
        const lines = rawEveryone.split("\n");
        const names = lines.map(line => line.trim()).filter(line => line.length > 0);
        everyone.set(names);
    }

    function setTestData() {
        rawEveryone = "Ander Åkjær\n" +
            "Børge Bissen\n" +
            "Charlie Low\n" +
            "Dan Tyrel\n" +
            "Figgo Fiskarl\n" +
            "George Geoløs\n" +
            "Hans Hinterseer\n" +
            "Ivar Vladimir\n" +
            "Jørgen Utson\n" +
            "Kim Kardas\n" +
            "Lars Larsen\n" +
            "Michael Boyesen-Hansen\n" +
            "Nanna Nansen\n" +
            "Ole Olsen\n";
        parseInput();
    }
</script>

<label>
    <b on:click={() => setTestData()}>Allesammen {$everyone.length ? `(${$everyone.length})` : ""}</b>
    <textarea rows={textareaCols} bind:value={rawEveryone} on:input={parseInput}></textarea>
</label>
