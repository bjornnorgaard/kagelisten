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

export const unknown = derived([saints, everyone], ([$saints, $everyone]) => {
    return $saints.filter((name) => !$everyone.includes(name));
});
