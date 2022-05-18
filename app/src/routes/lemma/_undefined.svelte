<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { connected, provider } from 'svelte-ethers-store';

	import { getContractWithProvider } from '$lib/web3/contract';
	import { getColorPalette } from '$lib/nft/color';

	// pass lemma as prop
	export let lemma: string;
	let errors: Partial<Record<'definition' | 'example', string | undefined>> = {};

	$: ({ background, primary } = getColorPalette(lemma));

	let definition: string;
	let example: string;

	const mint = async () => {
		definition = definition?.trim();
		example = example?.trim();

		// check for error, else clear
		if (!definition) {
			errors.definition = 'definition required';
			return;
		}
		errors.definition = undefined;

		// check for error, else clear
		if (!example) {
			errors.example = 'example required';
			return;
		}
		errors.example = undefined;

		if (!$connected) {
			// TODO: Use Web3Modal or Web3 React
			await window.ethereum.request({ method: 'eth_requestAccounts' });

			// catch err if contains unsupported chain id
		}
		const contract = await getContractWithProvider($provider);
		const fee = await contract.mintFee();

		await contract.mint(lemma, definition, example, {
			value: fee
		});
	};

	// TODO: Better Design
</script>

<div class="space-y-4 text-lg md:w-2/3">
	<div>
		<h4 class="text-gray-500">how it works</h4>
		<p class="text-base">
			enter a definition, add an example of how to use it in a sentence, and click mint to coin the
			word <strong>{lemma}</strong>.
		</p>
		<p class="text-base">
			after minting, you'll own the NFT and can use it however you like. share it, admire it, or
			trade it.
		</p>
	</div>
	<div>
		<h4 class="text-gray-500">definition</h4>
		<textarea
			bind:value={definition}
			class="p-2 w-full border-2 text-base"
			placeholder="Add your definition here..."
			class:border-rose-500={errors?.definition}
			required
		/>
		{#if errors?.definition}
			<div class="text-sm text-rose-500">{errors.definition}</div>
		{/if}
	</div>
	<div class="w-full">
		<h4 class="text-gray-500">example</h4>
		<textarea
			bind:value={example}
			class="p-2 w-full border-2 text-base italic"
			placeholder="Add an example of how it's used in a sentence..."
			class:border-rose-500={errors?.example}
			required
		/>
		{#if errors?.example}
			<div class="text-sm text-rose-500">{errors.example}</div>
		{/if}
	</div>
	<button
		class="w-32 p-4 rounded font-semibold border"
		style:background-color={background}
		style:color={primary}
		on:click={mint}>mint</button
	>
</div>
