<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { connected, signerAddress, provider } from 'svelte-ethers-store';

	import { getContractWithProvider } from '$lib/web3/contract';
	import { getColorPalette } from '$lib/nft/color';
	import { connect } from '$lib/web3/connect';

	// pass lemma as prop
	export let lemma: string;
	let errors: Partial<Record<'definition' | 'example' | 'mint', string | undefined>> = {};
	let minting = false;

	$: ({ background, primary } = getColorPalette(lemma));

	let definition: string;
	let example: string;

	$: mint = async () => {
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

		if (!($connected && $signerAddress)) {
			try {
				await connect();
			} catch (err) {
				// catch err if contains unsupported chain id
				errors.mint = 'unable to connect to a wallet provider. please try again.';
				return;
			}
		}

		try {
			const contract = await getContractWithProvider($provider);
			const fee = await contract.mintFee();
			const tx = await contract.mint(lemma, definition, example, {
				value: fee
			});
			minting = true;
			await tx.wait();
		} catch (err) {
			console.error(err);
			// catch err if contains unsupported chain id
			if (String(err).includes('unsupported chain')) {
				errors.mint = `unsupported chain. please connect to the ethereum mainnet.`;
				return;
			}

			if ('message' in err) {
				errors.mint = `transaction failed with message: ${err.message}`;
				return;
			}
			// catch err if contains unsupported chain id
			errors.mint = 'failed to mint. please try again.';
			return;
		} finally {
			minting = false;
		}
		errors.mint = undefined;

		// TODO: Success notification/state
	};
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
	<div>
		<button
			class="w-32 p-4 rounded font-semibold border"
			style:background-color={background}
			style:color={primary}
			disabled={minting}
			on:click={mint}>{minting ? 'minting...' : 'mint'}</button
		>
		{#if errors?.mint}
			<div class="text-sm text-rose-500">{errors.mint}</div>
		{/if}
	</div>
</div>
