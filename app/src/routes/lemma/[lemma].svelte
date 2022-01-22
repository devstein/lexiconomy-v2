<script lang="ts" context="module">
	import Header from '$lib/components/Header.svelte';

	export async function load({ params }) {
		return {
			props: {
				...params
			}
		};
	}
</script>

<script lang="ts">
	export let lemma: string;
</script>

<Header />
<div>lemma!</div>
<div>{lemma}</div>
