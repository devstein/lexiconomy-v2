<script lang="ts" context="module">
	export const prerender = true;

	import { getContract } from '$lib/web3/contract';

	const items = [
		'lemma',
		'lexiconomy',
		'characters',
		'nnmbl',
		'something',
		'another',
		'g',
		'h',
		'something really long',
		'a really really really really long'
	];

	// TODO: MOVE TO /[explore].ts file!
	export async function load({ params }) {
		const { lemma } = params;

		const contract = await getContract();

		const filter = contract.filters.Invent();
		const events = await contract.queryFilter(filter);
		const lemmas = events.map(({ args: { lemma } }) => lemma);

		// should we use a global store to share between pages?
		// how do we mutate once lemma is invented or a new definition/example is created
		return {
			props: {
				lemmas
			}
		};
	}

	// on load
	// list all tokens for the Lexiconomy
	// naive: invent events
	// OpenSea API?
	// Get example and definition for all lemmas

	// generate color based off word
</script>

<script lang="ts">
	export let lemmas: object[] = [];
</script>

<h1 class="text-5xl pb-4 mb-8 border-b-4 border-green-400">explore</h1>
<div class="px-8 py-4 h-full">
	<ul class="h-full grid grid-cols-5 gap-5 place-items-center break-words">
		{#each items as item}
			<li class="h-4/5 w-4/5 scene">
				<div class="card p-2 rounded">
					<a
						sveltekit:prefetch
						href="/lemma/{item}"
						class="text-center text-lg font-semibold card__face font-semibold flex flex-col justify-center items-center"
					>
						<div class="mx-2 font-mono">
							{item}
						</div>
					</a>
					<a href="/lemma/{item}" class="card__face card__face--back">
						<div class="m-4 space-y-2">
							<div>the world's decentralized dictionary</div>
							<div class="italic">i coined that phrase on the lexiconomy</div>
						</div>
					</a>
				</div>
			</li>
		{/each}
	</ul>
	<ul class="h-full grid grid-cols-5 gap-5 place-items-center break-words">
		{#each lemmas as item}
			<li class="h-4/5 w-4/5 scene">
				<div class="card p-2 rounded">
					<a
						href="/lemma/{item}"
						class="text-center text-lg font-semibold card__face font-semibold flex flex-col justify-center items-center"
					>
						<div class="mx-2 font-mono">
							{item}
						</div>
					</a>
					<a href="/lemma/{item}" class="card__face card__face--back">
						<div class="m-4 space-y-2">
							<div>the world's decentralized dictionary</div>
							<div class="italic">i coined that phrase on the lexiconomy</div>
						</div>
					</a>
				</div>
			</li>
		{/each}
	</ul>
	<div>Navigate pages</div>
</div>

<style>
	/* Add an arrow for definition  */
	:root {
		--green-pastel: #d1f7c4;
		--blue-pastel: #d0f0fd;
		--dark-blue-pastel: #9cf;
		--dark-orange-pastel: #eba134;
		--light-orange-pastel: #f2c17a;
	}

	.scene {
		perspective: 1000px;
	}

	.card {
		width: 100%;
		height: 100%;
		position: relative;
		transition: transform 0.75s;
		transform-style: preserve-3d;
	}

	.card__face {
		width: 100%;
		height: 100%;
		position: absolute;
		backface-visibility: hidden;
		background-color: #d0f0fd;
	}

	.card__face--back {
		width: 100%;
		height: 100%;
		transform: rotateY(180deg);
		background-color: #f2c17a;
	}

	.card:hover {
		transform: rotateY(180deg);
		transition: transform 0.75s;
	}
	/* class="text-lg font-semibold border-b-4 border-[#9cf] border-dotted pb-1 card__face" */
</style>
