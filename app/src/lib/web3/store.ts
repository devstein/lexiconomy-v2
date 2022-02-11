import { writable } from 'svelte/store';

export interface Lemma {
	tokenId: string;
	lemma: string;
	definition: string;
	example: string;
	owner: string;
}

// Lemmas
// Update when we get latestLemmas?
// Update when we load a page?

// Store
// lemmas
const lemmas = writable({});

export default lemmas;
