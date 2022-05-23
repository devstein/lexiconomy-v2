import { writable } from 'svelte/store';

export interface Lemma {
	tokenId: string;
	lemma: string;
	definition: string;
	example: string;
	owner: string;
	number: string;
}

// Store
// lemmas
const lemmas = writable<Record<string, Partial<Lemma> | undefined>>({});

export default lemmas;
