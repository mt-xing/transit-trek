<script lang="ts">
	export let checked: boolean;
	export let text: string | null = null;
	export let callback: (() => void) | null = null;

	$: displayedText = text || (checked ? 'Complete! 🎉' : 'Incomplete');
</script>

<label>
	<input type="checkbox" {checked} style="display: none;" readonly />

	<span class="checkbox" class:checked>
		{#if checked}
			✔
		{:else}
			╳
		{/if}
	</span>

	{#if callback}
		<button on:click={callback}>{displayedText}</button>
	{:else}
		{displayedText}
	{/if}
</label>

<style>
	label {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		margin-bottom: 10px;
		text-align: left;
	}

	.checkbox {
		width: 25px;
		height: 25px;
		flex-shrink: 0;
		font-size: 15px;
		background: #c0392b;
		color: white;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.5em;
		font-weight: bold;
	}

	.checkbox.checked {
		background: #27ae60;
	}

	button {
		cursor: pointer;
		font-size: 1em;
		background: none;
		border: none;
		text-decoration: underline;
		text-align: left;
	}

	button::after {
		content: '➤';
		margin-left: 0.5em;
		transform: translateX(0);
		display: inline-block;

		transition: transform 0.2s ease-in-out;
	}

	button:hover::after,
	button:focus::after {
		transform: translateX(10px);
	}

	button:active::after {
		transform: translateX(5px);
		transition: transform 0.1s ease-in-out;
	}
</style>
