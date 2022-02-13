<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { connected, provider } from 'svelte-ethers-store';

	import { getContractWithProvider } from '$lib/web3/contract';

	// pass lemma as prop
	export let lemma: string;

	let definition: string;
	let example: string;

	const mint = async () => {
		if (!$connected) {
			await window.ethereum.request({ method: 'eth_requestAccounts' });
		}
		const contract = await getContractWithProvider($provider);
		const fee = await contract.mintFee();

		await contract.mint(lemma, definition, example, {
			value: fee
		});
	};
</script>

<div class="space-y-4 text-lg w-2/3">
	<div>
		<p class="text-xl mb-2">you've discovered a new word!</p>
		<p>
			enter a definition and example usage to coin the word <strong>{lemma}</strong>. Once coined,
			you'll own the NFT and can use it however you like. share it, admire it, or trade it on
			OpenSea.
		</p>
	</div>
	<div>
		<h4 class="text-gray-500">definition</h4>
		<textarea bind:value={definition} class="w-full border-2 text-base" />
	</div>
	<div class="w-full">
		<h4 class="text-gray-500">example</h4>
		<textarea bind:value={example} class="w-full border-2 text-base" />
	</div>
	<button class="p-4 bg-green-200 rounded" on:click={mint}>Mint</button>
</div>
