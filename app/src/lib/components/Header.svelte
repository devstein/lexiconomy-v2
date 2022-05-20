<script lang="ts">
	import { slide } from 'svelte/transition';

	import GlobalSearchBar from '$lib/components/GlobalSearchBar.svelte';

	let showMobileMenu = false;
	const toggleMenu = () => (showMobileMenu = !showMobileMenu);
</script>

<header class="my-4 mx-2">
	<div class="hidden md:flex flex-row items-center font-mono space-x-4">
		<a href="/home" class="text-2xl">lexiconomy</a>
		<GlobalSearchBar />
		<a
			class="text-xl hover:underline hover:decoration-pink-500 hover:underline-offset-1 decoration-double"
			href="/explore">explore</a
		>
		<a
			class="text-xl hover:underline hover:decoration-cyan-500 hover:underline-offset-1 decoration-double"
			href="/guide">guide</a
		>
		<a
			class="text-xl hover:underline hover:decoration-yellow-500 hover:underline-offset-1 decoration-double"
			href="/manifesto">manifesto</a
		>
	</div>

	<div class="flex flex-row md:hidden space-x-4">
		<!-- Hamburger menu -->
		<button class="space-y-2" on:click={toggleMenu}>
			<span class="block w-8 h-0.5 bg-gray-600" />
			<span class="block w-8 h-0.5 bg-gray-600" />
			<span class="block w-8 h-0.5 bg-gray-600" />
		</button>
		<GlobalSearchBar />
	</div>
	{#if showMobileMenu}
		<ul class="mt-2 space-y-1 font-mono md:hidden" transition:slide>
			<li on:click={toggleMenu}>
				<a
					class="text-lg hover:underline hover:decoration-pink-500 hover:underline-offset-1 decoration-double"
					href="/explore">explore</a
				>
			</li>
			<li on:click={toggleMenu}>
				<a
					class="text-lg hover:underline hover:decoration-cyan-500 hover:underline-offset-1 decoration-double"
					href="/guide">guide</a
				>
			</li>
			<li on:click={toggleMenu}>
				<a
					class="text-lg hover:underline hover:decoration-yellow-500 hover:underline-offset-1 decoration-double"
					href="/manifesto">manifesto</a
				>
			</li>
		</ul>
	{/if}
</header>
