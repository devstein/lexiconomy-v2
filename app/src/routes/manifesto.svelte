<script lang="ts" context="module">
	export const prerender = true;

	// @ts-ignore
	import Manifesto from '$lib/docs/manifesto.md';
</script>

<svelte:head>
	<title>manifesto</title>
	<meta name="description" content="the manifesto of the lexiconomy" />
</svelte:head>

<article class="ml-10 md:ml-20 prose prose-headings:font-mono md:prose-lg md:max-w-2xl">
	<Manifesto />
</article>
