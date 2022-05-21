<script lang="ts" context="module">
	export const prerender = true;

	import Guide from '$lib/docs/guide.md';
</script>

<svelte:head>
	<title>guide</title>
	<meta
		name="description"
		content="your guide to the lexiconomy. learn how the lexiconomy works and how to use it."
	/>
</svelte:head>

<article class="prose prose-headings:font-mono md:prose-lg">
	<Guide />
</article>
