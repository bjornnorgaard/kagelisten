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
</script>

<label class="raw-input-container">
    <span>Allesammen</span>
    <textarea rows={textareaCols} bind:value={rawEveryone} on:input={parseInput}></textarea>
</label>
