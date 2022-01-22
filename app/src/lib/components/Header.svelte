<script lang="ts">
	import { goto } from '$app/navigation';

	let search: string;

	const submit = () => goto(`/lemma/${search}`);
</script>

<header class="flex flex-row items-center font-mono space-x-4">
	<a href="/" class="text-2xl">lexiconomy</a>
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
		class="nav-search-icon"
	>
		<circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
	</svg>
	<form on:submit|preventDefault={submit} class="flex-1">
		<input
			bind:value={search}
			label="Label"
			class="w-full focus:bg-slate-100 focus-visible:outline-none"
		/>
	</form>
	<a class="text-xl" href="/explore">explore</a>
	<a class="text-xl" href="/guide">guide</a>
	<a class="text-xl" href="/manifesto">manifesto</a>
</header>
