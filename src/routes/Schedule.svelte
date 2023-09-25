<script lang="ts">
    import { everyone, rawSaints, saints } from "$lib/stores";
    import { derived } from "svelte/store";

    interface AvailableSpot {
        lineIndex: number;
        what: string;
        who: string;
    }

    const slackers = derived([ saints, everyone ], ([ $saints, $everyone ]) => {
        return $everyone.filter(e => !$saints.includes(e));
    });

    const spots = derived(rawSaints, $rawSaints => {
        const lines = $rawSaints.split("\n");
        const availableSpots: AvailableSpot[] = [];

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(":")) {
                const split = lines[i].split(":");
                const who: string = split[1].trim();
                if (who) continue;
                availableSpots.push({ lineIndex: i, what: split[0], who: who });
            }
        }

        return availableSpots;
    })

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
