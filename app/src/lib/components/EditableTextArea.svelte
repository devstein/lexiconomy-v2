<script lang="ts">
	// props
	export let value: string;
	export let placeholder: string | undefined = undefined;
	export let editable: boolean;
	export let onSave: () => void;

	let editing = false;
	let prevValue = value;

	const edit = () => {
		editing = true;
		// save previous state
		prevValue = value;
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
	<textarea
		readonly={!editing}
		bind:value
		{placeholder}
		class="w-full text-base"
		class:resize-none={!editing}
		class:focus-visible:outline-none={!editing}
		class:cursor-default={!editing}
		class:border-2={editing}
		on:dblclick={() => editable && edit()}
	/>
	{#if editable}
		<div class="flex flex-row-reverse flex-nowrap">
			{#if editing}
				<button class="button" on:click={save}>save</button>
				<button class="button" on:click={cancel}>cancel</button>
			{:else}
				<button class="button" on:click={edit}>edit</button>
			{/if}
		</div>
	{/if}
</div>

<style>
	.button {
		@apply text-sm text-blue-300 ml-2;
	}
</style>
