<script lang="ts">
	import type { PublicChallengeDefinition } from '../../types/challenge';
	import type { ChallengeProgress } from '../../types/team';
	import { isChallengeComplete, isChallengeUnlocked } from '../../utils/challenge';

	export let challenge: PublicChallengeDefinition;
	export let allChallenges: PublicChallengeDefinition[];
	export let challengeProgress: ChallengeProgress;
	export let openCallback: (c: PublicChallengeDefinition) => void;

	$: isUnlocked = isChallengeUnlocked(challenge, allChallenges, challengeProgress);
	$: isComplete = isChallengeComplete(challenge, allChallenges, challengeProgress);
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
