import { derived, writable } from "svelte/store";

export const rawSaints = writable<string>("");

export const everyone = writable<string[]>([]);

export const saints = derived(rawSaints, ($rawSaints) => {
    return $rawSaints
        .split("\n")
        .filter(line => line.includes(": "))
        .map(line => line.split(":")[1])
        .map((name) => name.trim())
        .filter(name => name.length > 0);
});

export const unknown = derived([ saints, everyone ], ([ $saints, $everyone ]) => {
    return $saints.filter((name) => !$everyone.includes(name));
});

export const slackers = derived([ saints, everyone ], ([ $saints, $everyone ]) => {
    return $everyone.filter(e => !$saints.includes(e)).map(n => {
        const names = n.split(" ");
        if (names.length > 3) {
            return `${names[0]} Idiot ${names.reverse()[0]}`;
        }
    });
});

export interface AvailableSpot {
    lineIndex: number;
    what: string;
    who: string;
}

export const spots = derived(rawSaints, $rawSaints => {
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
