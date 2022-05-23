<script lang="ts">
	import { onMount } from 'svelte';

	// props
	export let title: string;
	export let value: string;
	export let placeholder: string | undefined = undefined;
	export let editable: boolean;
	export let onSave: () => void;

	// naive way of adding classes to the textarea component...
	// reconsider in future
	export let additionalClasses = '';

	const LINE_HEIGHT = 24;
	const TEXTAREA_BUFFER = LINE_HEIGHT / 4;

	let node: HTMLTextAreaElement;
	let editing = false;
	let prevValue = value;
	let height = LINE_HEIGHT;

	onMount(() => {
		// adjust height based off scroll height on load (i.e do not show scrollbar)
		height = node.scrollHeight;
	});

	const getHeighBasedOffValue = (str: string) => {
		const numberOfLineBreaks = (str.match(/\n/g) || []).length + 2;
		return LINE_HEIGHT * numberOfLineBreaks + TEXTAREA_BUFFER;
	};

	// update height whenever value changes
	$: height = getHeighBasedOffValue(value);

	const edit = () => {
		editing = true;
		// save previous state
		height = node.scrollHeight;
	};

	const cancel = () => {
		editing = false;
		// reset
		value = prevValue;
	};

	const save = () => {
		// call onSave first in-case it fails we don't want to toggle editing
		if (value.trim() !== prevValue.trim()) {
			onSave();
		}
		editing = false;
	};

	// TODO: Require non-empty values + error message or disable save button?
	// TODO: Better handle long texts (dynamic textarea size)
	// TODO: Add a shortcuts (cmd+enter, escape)
</script>

<div class="w-full">
	<div class="flex flex-row flex-nowrap align-start">
		<h3 class="flex-1 text-gray-500">{title}</h3>
		{#if editable}
			{#if editing}
				<button class="button" on:click={save}>save</button>
				<button class="button" on:click={cancel}>cancel</button>
			{:else}
				<button class="button" on:click={edit}>edit</button>
			{/if}
		{/if}
	</div>
	<textarea
		readonly={!editing}
		bind:value
		bind:this={node}
		{placeholder}
		style:height={`${height}px`}
		class={`w-full text-base ${additionalClasses}`}
		class:resize-none={!editing}
		class:focus-visible:outline-none={!editing}
		class:cursor-default={!editing}
		class:border-2={editing}
		class:p-2={editing}
		on:dblclick={() => editable && edit()}
	/>
</div>

<style lang="postcss">
	.button {
		@apply text-sm text-blue-300 ml-2;
	}
</style>
