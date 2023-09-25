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

    function copyUpdatedList() {
        navigator.clipboard.writeText($rawSaints);
    }
</script>

{#if $spots.length}
    <p class="message">Der er {$slackers.length} slackere og {$spots.length} ledige pladser.</p>
    <button on:click={completeSchedule} disabled={!$spots.length}>Udfyld åbne pladser</button>
{:else}
    <p class="message">Alle pladser er udfyldte.</p>
    <button on:click={() => copyUpdatedList()}>Kopier til udklipsholder</button>
{/if}

<style>
    .message {
        @apply text-center;
    }
</style>
