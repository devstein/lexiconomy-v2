<script lang="ts">
	import { goto } from '$app/navigation';

	let search: string = '';

	const submit = () => {
		if (!search) return;
		search = search.toLowerCase().trim();

		try {
			window.heap.track('Search', { lemma: search });
		} catch (err) {
			console.log('failed to track search event', err);
		}
		goto(`/lemma/${encodeURIComponent(search)}`);
		// reset search on navigation
		search = '';
	};
</script>

<form on:submit|preventDefault={submit} class="flex flex-row flex-1">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="mr-4"
	>
		<circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
	</svg>
	<input
		type="search"
		placeholder="discover a word..."
		bind:value={search}
		label="Search"
		class="w-full focus-visible:outline-none mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
	/>
</form>
