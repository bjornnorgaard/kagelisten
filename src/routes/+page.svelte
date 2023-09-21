<script lang="ts">
    let rawSaints = `Mandag d. XX/XX
Kage: A B C
Kage: D E F
Kage: G H I 
Kage:
Kage:
Frugt: 1 2 3
Frugt:
Frugt:`;
    let rawAll = `A B C
D E F
G H I
J K L
M N
O P Q
R S T
U V W
X Y Z
Æ Ø Å`;
    let rawOutput = "";
    let saints: string[] = [];
    let slackers: string[] = [];
    let unknownSaints: string[] = [];
    let saintSlackers: string[] = [];
    let superSlackers: string[] = [];
    let parsedInput = "";

    function handleInput() {

        rawOutput = "";
        saints = [];
        slackers = [];
        unknownSaints = [];
        saintSlackers = [];
        superSlackers = [];
        parsedInput = "";

        let goodLineSplit = rawSaints.split("\n");

        for (let line of goodLineSplit) {
            if (!line.includes(':')) continue;
            if (!line.split(":")[1]?.trim()) continue;

            if (line.includes("Kage:")) {
                saints = [ ...saints, line.replace("Kage:", "").trim() ];
            } else if (line.includes("Frugt:")) {
                saints = [ ...saints, line.replace("Frugt:", "").trim() ];
            } else if (line.includes("Pizzasnegle:")) {
                saints = [ ...saints, line.replace("Pizzasnegle:", "").trim() ];
            } else if (line.includes("Salat:")) {
                saints = [ ...saints, line.replace("Salat:", "").trim() ];
            } else if (line.includes("Pølsehorn:")) {
                saints = [ ...saints, line.replace("Pølsehorn:", "").trim() ];
            } else if (line.includes("Stole:")) {
                saints = [ ...saints, line.replace("Stole:", "").trim() ];
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

        for (let line of saints) {
            if (!line) continue;

            line = line.trim();

            if (!allLineSplit.includes(line)) {
                unknownSaints = [ ...unknownSaints, line ];
            }
        }

        let tempSlackers = Object.assign([], slackers) as string[];
        for (let line of goodLineSplit) {
            line = line.trim();
            if (!line.includes(':')) {
                rawOutput = `${rawOutput}${line}\n`;
            } else if (!line.split(":")[1]?.trim()) {
                let slacker = tempSlackers.pop();
                if (slacker !== undefined) {
                    saintSlackers = [ ...saintSlackers, slacker ];
                } else {
                    slacker = 'MANGLER SLACKERS';
                }
                rawOutput = `${rawOutput}${line} ${slacker} 🤥\n`;
            } else {
                let split = line.split(":");
                let part1 = split[0].trim();
                let part2 = split[1].trim();
                if (unknownSaints.includes(part2)) {
                    part2 = `${part2} 🕵️`
                }
                rawOutput = `${rawOutput}${part1}: ${part2}\n`;
            }
        }

        superSlackers = slackers.filter(s => !saintSlackers.includes(s));

        parsedInput = rawOutput;

        navigator.clipboard.writeText(parsedInput);
    }
</script>

<div class="mx-auto flex w-fit flex-col items-center gap-4">
    <h1 class="text-3xl font-bold">Stole/Kagelisten</h1>

    <label class="w-full">
        <span>De Artige</span>
        <textarea class="w-full" rows="5" bind:value={rawSaints}></textarea>
    </label>

    <label class="w-full">
        <span>Allesammen</span>
        <textarea class="w-full" rows="5" bind:value={rawAll}></textarea>
    </label>

    <button class="w-fit rounded-full bg-red-200 px-4 py-2" on:click={handleInput}>Parse</button>

    <div class="flex gap-4">
        <div class="names">
            <h1 class="text-xl font-bold">Unknowns saints</h1>
            {#each unknownSaints as unknownSaint}
                <p>{unknownSaint}</p>
            {/each}
        </div>

        <div class="names">
            <h1 class="text-xl font-bold">Saints</h1>
            {#each saints as saint}
                <p>{saint}</p>
            {/each}
        </div>

        <div class="names">
            <h1 class="text-xl font-bold">Saint slackers</h1>
            {#each saintSlackers as saintSlacker}
                <p>{saintSlacker}</p>
            {/each}
        </div>

        <div class="names">
            <h1 class="text-xl font-bold">Super slackers</h1>
            {#each superSlackers as superSlacker}
                <p>{superSlacker}</p>
            {/each}
        </div>

        <div class="names">
            <h1 class="text-xl font-bold">Slackers</h1>
            {#each slackers as slacker}
                <p>{slacker}</p>
            {/each}
        </div>
    </div>

    <pre>{parsedInput}</pre>
</div>

<style>
    .names {
        @apply rounded-2xl border-2 border-green-600 p-2;
    }
</style>
