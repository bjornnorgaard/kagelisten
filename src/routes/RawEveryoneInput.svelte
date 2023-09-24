<script lang="ts">
    import {everyone} from "$lib/stores";
    import {textareaCols} from "$lib/constants";

    let rawEveryone: string = "";

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
            "Some Bojsen Hansen\n" +
            "Miheala Hansen Boje\n" +
            "Emma Jørgensen\n" +
            "Jørgen Emmason\n" +
            "Simon Larsen\n" +
            "Lars Kristensen\n" +
            "Jørgen Hansi\n" +
            "Emma Gad\n";
        parseInput();
    }
</script>

<label class="raw-input-container">
    <span on:click={() => setTestData()}>Allesammen</span>
    <textarea rows={textareaCols} bind:value={rawEveryone} on:input={parseInput}></textarea>
</label>
