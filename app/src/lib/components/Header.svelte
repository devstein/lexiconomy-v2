<script lang="ts">
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let search: string;
	let showMobileMenu = false;

	const submit = () => {
		if (!search) return;
		goto(`/lemma/${encodeURIComponent(search.trim())}`);
	};
</script>

<header class="my-4 mx-2">
	<div class="hidden md:flex flex-row items-center font-mono space-x-4">
		<a href="/home" class="text-2xl">lexiconomy</a>
		<!-- TODO: On click shift focus to input -->
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
				type="search"
				placeholder="discover a word..."
				bind:value={search}
				label="Search"
				class="w-full focus-visible:outline-none mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
			/>
		</form>
		<a class="text-xl" href="/explore">explore</a>
		<a class="text-xl" href="/guide">guide</a>
		<a class="text-xl" href="/manifesto">manifesto</a>
	</div>

	<div class="flex flex-row md:hidden space-x-4">
		<!-- Hamburger menu -->
		<button class="space-y-2" on:click={() => (showMobileMenu = !showMobileMenu)}>
			<span class="block w-8 h-0.5 bg-gray-600" />
			<span class="block w-8 h-0.5 bg-gray-600" />
			<span class="block w-8 h-0.5 bg-gray-600" />
		</button>
		<!-- TODO: On click shift focus to input -->
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
				type="search"
				placeholder="discover a word..."
				bind:value={search}
				label="Search"
				class="w-full focus-visible:outline-none mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
			/>
		</form>
	</div>
	{#if showMobileMenu}
		<ul class="mt-2 space-y-1 font-mono md:hidden" transition:slide>
			<li>
				<a class="text-lg" href="/explore">explore</a>
			</li>
			<li>
				<a class="text-lg" href="/guide">guide</a>
			</li>
			<li>
				<a class="text-lg" href="/manifesto">manifesto</a>
			</li>
		</ul>
	{/if}
</header>
