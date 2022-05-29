<script lang="ts" context="module">
	export const prerender = true;

	// @ts-ignore
	import Guide from '$lib/docs/guide.md';
</script>

<svelte:head>
	<title>guide</title>
	<meta
		name="description"
		content="your guide to the lexiconomy. learn how the lexiconomy works and how to use it."
	/>
</svelte:head>

<article
	class="ml-10 md:ml-20 prose prose-headings:font-mono md:prose-lg md:max-w-2xl lg:max-w-3xl"
>
	<Guide />
</article>
