<script lang="ts">
    let rawSaints = "";
    let rawAll = "";

    let saints: string[] = [];
    let slackers: string[] = [];

    let parsedInput = "";

    function handleInput() {
        let goodLineSplit = rawSaints.split("\n");

        for (let line of goodLineSplit) {
            if (!line.split(":")[1]?.trim()) continue;

            if (line.includes("Kage:")) {
                saints = [ ...saints, line.replace("Kage:", "") ];
            } else if (line.includes("Frugt:")) {
                saints = [ ...saints, line.replace("Frugt:", "") ];
            } else if (line.includes("Pizzasnegle:")) {
                saints = [ ...saints, line.replace("Pizzasnegle:", "") ];
            } else if (line.includes("Salat:")) {
                saints = [ ...saints, line.replace("Salat:", "") ];
            } else if (line.includes("Pølsehorn:")) {
                saints = [ ...saints, line.replace("Pølsehorn:", "") ];
            } else if (line.includes("Stole:")) {
                saints = [ ...saints, line.replace("Stole:", "") ];
            }
        }

        let allLineSplit = rawAll.split("\n");

        for (let line of allLineSplit) {
            if (!line) continue;

            line = line.trim();

            if (!saints.includes(line)) {
                slackers = [ ...slackers, line ];
            }
        }

        parsedInput = rawSaints;
    }
</script>

<div class="mx-auto flex max-w-md flex-col items-center gap-4">
    <h1 class="text-3xl font-bold">Kagelisten</h1>

    <label class="w-full">
        <span>De Artige</span>
        <textarea class="w-full" rows="5" bind:value={rawSaints}></textarea>
    </label>

    <label class="w-full">
        <span>Allesammen</span>
        <textarea class="w-full" rows="5" bind:value={rawAll}></textarea>
    </label>

    <button class="w-fit rounded-full bg-red-200 px-4 py-2" on:click={handleInput}>Parse</button>

    <h1 class="text-xl font-bold">Saints</h1>
    {#each saints as saint}
        <p>{saint}</p>
    {/each}


    <h1 class="text-xl font-bold">Slackers</h1>
    {#each slackers as slacker}
        <p>{slacker}</p>
    {/each}

    <pre>{parsedInput}</pre>
</div>



