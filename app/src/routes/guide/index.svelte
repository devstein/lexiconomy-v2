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

<Header />

<div>guide</div>
