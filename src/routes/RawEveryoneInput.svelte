<script lang="ts">
    import {everyone} from "$lib/stores";
    import {onMount} from "svelte";
    import {textareaCols} from "$lib/constants";

    let rawEveryone = "Rachana Cokkie Cheng\n" +
        "Marina Samson Slávka\n" +
        "Kemuel Misho Hurşit\n" +
        "Sintija Sid Aleksey\n" +
        "Artur Ceres Aruna\n" +
        "Michael Bojsen-Hansen\n" +
        "Emma Jørgensen\n" +
        "Simon Larsen\n" +
        "Lars Kristensen\n" +
        "Jørgen Hansi\n" +
        "Emma Gad\n";

    onMount(() => parseInput()); // TODO: Remove when done.

    function parseInput() {
        if (!rawEveryone) return;
        const lines = rawEveryone.split("\n");
        const names = lines.map(line => line.trim()).filter(line => line.length > 0);
        everyone.set(names);
    }
</script>

<label class="w-full">
    <span>Allesammen</span>
    <textarea class="w-full p-2" rows={textareaCols} bind:value={rawEveryone} on:input={parseInput}></textarea>
</label>
