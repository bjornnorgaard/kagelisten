import { derived, writable } from "svelte/store";

export const rawSaints = writable<string>("");

export const everyone = writable<string[]>([]);
export const saints = writable<string[]>([]);

export const unknown = derived([saints, everyone], ([$saints, $everyone]) => {
    return $saints.filter((name) => !$everyone.includes(name));
});


