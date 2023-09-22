<script lang="ts">
    import {onMount} from "svelte";
    import {rawSaints, saints} from "$lib/stores";
    import {textareaCols} from "$lib/constants";

    let rawSaintsString = "Mandag d. XX/XX\n" +
        "Kage: Rachana Cokkie Cheng\n" +
        "Kage: Marina Samson Slávka\n" +
        "Kage: Kemuel Misho Hurşit\n" +
        "Kage: Sintija Sid Aleksey\n" +
        "Kage: Artur Ceres Aruna\n" +
        "Kage: Mikhail Bøjsen Hansen\n" +
        "Kage: Emma\n" +
        "Kage: \n" +
        "Frugt: \n" +
        "Frugt: \n" +
        "Frugt: \n";

    const words = ["Kage", "Frugt"];

    onMount(() => parseInput()); // TODO: Remove when done.

    function parseInput() {
        if (!rawSaintsString) return;
        rawSaints.set(rawSaintsString);
        rawSaintsString = rawSaintsString;
        let lines = rawSaintsString.split("\n");

        lines = lines.map(line => {
            words.forEach(word => {
                line = line.replace(word + ":", "").trim();
            });
            return line.trim();
        });

        lines = lines.filter(line => !line.includes("d. ") && !line.includes("/"));
        lines = lines.map(line => line.trim()).filter(line => line.length > 0);

        saints.set(lines);
    }
</script>

<label>
    <b>De Artige</b>
    <textarea rows={textareaCols} bind:value={rawSaintsString} on:input={parseInput}></textarea>
</label>
