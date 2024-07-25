<script lang="ts">
	import type { TT3PublicChallengeDefinition } from '../../../types/tt3/challenge';
	import type { TT3DashboardPassthroughInfo } from '../../../types/tt3/map';
	import { isChallengeComplete, isChallengeUnlocked } from '../../../utils/challenge';

	export let challenge: TT3PublicChallengeDefinition;
	export let dashboardInfo: TT3DashboardPassthroughInfo;
	export let openCallback: (c: TT3PublicChallengeDefinition) => void;

	$: isUnlocked = isChallengeUnlocked(challenge, dashboardInfo);
	$: isComplete = isChallengeComplete(challenge, dashboardInfo);
</script>

<button
	on:click={openCallback.bind(undefined, challenge)}
	class={`${isUnlocked ? 'unlock' : 'lock'} ${isComplete ? 'done' : 'incomplete'}`}
>
	{#if isComplete}
		🎫
	{:else if !isUnlocked}
		🔒
	{:else}
		🔓
	{/if}
</button>

<style>
	button {
		width: 40px;
		height: 40px;

		flex-shrink: 0;
		flex-grow: 0;
		overflow: hidden;

		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border-radius: 10px;
		background: white;
		font-size: 20px;
		cursor: pointer;
		margin: 2px;
	}

	.done {
		border: 7px #27ae60 solid;
	}

	.incomplete.lock {
		border: 1px #7f8c8d solid;
	}

	.incomplete.unlock {
		border: 3px #2980b9 solid;
	}
</style>
