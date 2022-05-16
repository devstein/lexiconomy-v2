<script lang="ts">
	export const prerender = true;

	import { goto } from '$app/navigation';

	let search: string;

	const submit = () => {
		if (!search) return;
		goto(`/lemma/${encodeURIComponent(search.trim())}`);
	};
</script>

<div class="h-full flex flex-col items-center justify-center font-mono text-center">
	<div class="space-y-4">
		<h1 class="text-7xl">lexiconomy</h1>
		<h3 class="text-xl">/ leksi-kän-əmē /</h3>
		<h3 class="text-xl italic">noun</h3>
		<h2 class="text-2xl">1. the world's decentralized dictionary.</h2>
	</div>
	<div class="w-2/5 space-y-8">
		<form on:submit|preventDefault={submit} class="w-full flex mt-8 space-x-4">
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
			<!-- svelte-ignore a11y-autofocus -->
			<input
				autofocus
				type="search"
				placeholder="discover a word..."
				bind:value={search}
				label="Search"
				class="w-full focus-visible:outline-none mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
			/>
		</form>
		<div class="grid grid-cols-4 text-xl">
			<a class="p-8 hover:bg-slate-100 focus:bg-slate-100" href="/manifesto">manifesto</a>
			<a class="p-8 hover:bg-slate-100 focus:bg-slate-100" href="/guide">guide</a>
			<a class="p-8 hover:bg-slate-100 focus:bg-slate-100" href="/explore">explore</a>
			<a class="p-8 hover:bg-slate-100 focus:bg-slate-100" href="/explore">trade</a>
		</div>
	</div>
</div>
