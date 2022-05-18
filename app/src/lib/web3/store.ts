import { writable } from 'svelte/store';

export interface Lemma {
	tokenId: string;
	lemma: string;
	definition: string;
	example: string;
	owner: string;
	number: string;
}

// Lemmas
// Update when we get latestLemmas?
// Update when we load a page?

// Store
// lemmas
const lemmas = writable<Record<string, Lemma | undefined>>({});

export default lemmas;
