<script lang="ts" context="module">
	export const prerender = true;

	import GlobalSearchBar from '$lib/components/GlobalSearchBar.svelte';
</script>

<div class="h-full flex flex-col items-center justify-center text-center">
	<div class="space-y-3 md:space-y-4">
		<h1 class="font-mono text-5xl md:text-7xl">lexiconomy</h1>
		<h3 class="font-light	text-lg md:text-xl">/ leksi-kän-əmē /</h3>
		<h3 class="font-light	text-lg md:text-xl italic">noun</h3>
		<h2 class="font-light text-xl md:text-2xl">1. the world's decentralized dictionary.</h2>
	</div>
	<div class="mt-12 w-4/5 lg:w-3/5 space-y-8">
		<GlobalSearchBar />
		<div class="font-mono grid grid-rows-3 text-lg md:grid-cols-3 md:text-xl">
			<a
				sveltekit:prefetch
				class="p-4 md:p-12 hover:bg-pink-200 focus:bg-pink-200 transition transition-colors outline-black"
				href="/explore">explore</a
			>
			<a
				sveltekit:prefetch
				class="p-4 md:p-12 hover:bg-cyan-200 focus:bg-cyan-200 transition transition-colors outline-black"
				href="/manifesto">manifesto</a
			>
			<a
				sveltekit:prefetch
				class="p-4 md:p-12 hover:bg-yellow-200 focus:bg-yellow-200 transition transition-colors outline-black"
				href="/guide">guide</a
			>
		</div>
	</div>
</div>
