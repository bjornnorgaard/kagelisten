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
        rawEveryone = "Rachana Cokkie Cheng\n" +
            "Marina Samson Slávkap\n" +
            "Kemuel Misho Hurşit\n" +
            "Sintija Sid Aleksey\n" +
            "Artur Ceres Aruna\n" +
            "Michael Bojsen-Hansen\n" +
            "Michael Derp Hansen\n" +
            "Miheala Hansen Boje\n" +
            "Emma Jørgensen\n" +
            "Jørgen Emmason\n" +
            "Simon Larsen\n" +
            "Lars Kristensen\n" +
            "Jørgen Hansi\n" +
            "Emma Gad\n";
        parseInput();
    }

    async function onFocus() {
        if (rawEveryone.length) return;
        rawEveryone = await navigator.clipboard.readText();
        parseInput();
    }
</script>

<label>
    <b on:click={() => setTestData()}>Allesammen {$everyone.length ? `(${$everyone.length})` : ""}</b>
    <textarea rows={textareaCols} bind:value={rawEveryone} on:focus={() => onFocus()} on:input={parseInput}></textarea>
</label>
