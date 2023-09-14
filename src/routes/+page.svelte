<script lang="ts">
    let rawInput = "";
    let parsedInput = "";

    function handleInput() {
        parsedInput = rawInput;
    }
</script>

<div class="mx-auto flex max-w-md flex-col items-center gap-4">
    <h1 class="text-3xl font-bold">Kagelisten</h1>

    <textarea class="w-full" rows="5" bind:value={rawInput}></textarea>

    <button class="w-fit rounded-full bg-red-200 px-4 py-2" on:click={handleInput}>Parse</button>

    <pre>{parsedInput}</pre>
</div>
