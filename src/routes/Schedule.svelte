<script lang="ts">
    import { rawSaints, saints, slackers, spots } from "$lib/stores";

    function completeSchedule() {
        const names = getNamesForMissingSpots();
        rawSaints.update(rs => {
            const lines = rs.split("\n");
            for (let spot of $spots) {
                lines[spot.lineIndex] = `${spot.what}: ${names.pop()}`;
            }
            return lines.join("\n");
        });
    }

    function getNamesForMissingSpots(): string[] {
        let names = [ ...$slackers ];

        let missingSlackerCount = $spots.length - names.length;
        if (missingSlackerCount) {
            let missingSaints: string[] = $saints
                .sort(() => Math.random() - 0.5)
                .slice(0, missingSlackerCount);

            names.push(...missingSaints);
        }

        names = names.sort(() => Math.random() - 0.5);
        return names;
    }

    let copyButtonMessage = "Kopier ny liste til udklipsholder";

    function copyUpdatedList() {
        const temp = copyButtonMessage;
        copyButtonMessage = "Kopieret!";
        navigator.clipboard.writeText($rawSaints);
        setTimeout(() => copyButtonMessage = temp, 2000);
    }
</script>

{#if $spots.length}
    <p class="text-center">Der er {$slackers.length} slackere og {$spots.length} ledige pladser.</p>
    <button on:click={completeSchedule} disabled={!$spots.length}>Udfyld ledige pladser</button>
{:else}
    <button on:click={() => copyUpdatedList()}>{copyButtonMessage}</button>
{/if}
