<script lang="ts" context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export function load({ status }) {
		// go to the lemma page for the error code
		return {
			status: 307,
			redirect: `/lemma/${status}`
		};
	}
</script>
