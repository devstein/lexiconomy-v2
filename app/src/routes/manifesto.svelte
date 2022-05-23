<script lang="ts" context="module">
	export const prerender = true;

	// @ts-ignore
	import Manifesto from '$lib/docs/manifesto.md';
</script>

<svelte:head>
	<title>manifesto</title>
	<meta name="description" content="the manifesto of the lexiconomy" />
</svelte:head>

<article class="prose prose-headings:font-mono md:prose-lg">
	<Manifesto />
</article>
