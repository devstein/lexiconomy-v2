<h1 class="text-5xl pb-4 mb-8 border-b-4 border-purple-400">manifesto</h1>

<div class="flex flex-row justify-around">
	<div class="size scene">
		<div class="card p-2 rounded">
			<a
				sveltekit:prefetch
				href="/lemma/lexiconomy"
				class="text-center text-3xl card__face font-semibold flex flex-col justify-center items-center"
			>
				<div class="mx-2 font-mono">lexiconomy</div>
			</a>
			<a href="/lemma/lexiconomy" class="card__face card__face--back text-xl">
				<div class="flex flex-row-reverse m-4">#4</div>
				<div class="mx-4 space-y-4 text-xl">
					<div>
						<div class="text-base text-gray-700">definition</div>
						<div>the world's decentralized dictionary</div>
					</div>
					<div>
						<div class="text-base text-gray-700">example</div>
						<div class="italic">i coined that phrase on the lexiconomy</div>
						<div />
					</div>
				</div></a
			>
		</div>
	</div>

	<div class="size bg">
		<div class="p-2 rounded h-full">
			<a sveltekit:prefetch href="/lemma/lexiconomy" class="flex flex-col align-start h-full">
				<div class="my-4 font-mono text-3xl font-semibold text-center">lexiconomy</div>
				<div class="mx-4 space-y-4 text-xl">
					<div>
						<div class="text-base text-gray-700">definition</div>
						<div>the world's decentralized dictionary</div>
					</div>
					<div>
						<div class="text-base text-gray-700">example</div>
						<div class="italic">i coined that phrase on the lexiconomy</div>
					</div>
				</div>
				<div class="flex-1 align-self-end flex flex-row-reverse items-end">#4</div>
			</a>
		</div>
	</div>

	<div class="size">
		<div class="p-2 rounded h-full">
			<a sveltekit:prefetch href="/lemma/lexiconomy" class="flex flex-col align-start h-full">
				<div class="my-4 font-mono text-3xl font-semibold text-center color">lexiconomy</div>
				<div class="mx-4 space-y-4 text-xl">
					<div>
						<div class="text-base color">definition</div>
						<div class="">the world's decentralized dictionary</div>
					</div>
					<div>
						<div class="text-base text-gray-700 color">example</div>
						<div class="italic">i coined that phrase on the lexiconomy</div>
					</div>
				</div>
				<div class="flex-1 align-self-end flex flex-row-reverse items-end">#4</div>
			</a>
		</div>
	</div>
</div>

<style>
	.size {
		height: 350px;
		width: 350px;
	}

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
		/* background-color: #f2c17a; */
		/* background-color: var(--green-pastel); */
		background-color: var(--light-orange-pastel);
	}

	.card:hover {
		transform: rotateY(180deg);
		transition: transform 0.75s;
	}

	.bg {
		background-color: var(--green-pastel);
	}

	.color {
		color: var(--dark-orange-pastel);
	}
</style>
