<script lang="ts">
	import type { PublicChallengeDefinition } from '../../types/challenge';
	import type { ChallengeProgress } from '../../types/team';
	import { isChallengeComplete, isChallengeUnlocked } from '../../utils/challenge';

	export let challenge: PublicChallengeDefinition;
	export let allChallenges: PublicChallengeDefinition[];
	export let challengeProgress: ChallengeProgress;
	export let openCallback: (c: PublicChallengeDefinition) => void;

	const isUnlocked = isChallengeUnlocked(challenge, allChallenges, challengeProgress);
	const isComplete = isChallengeComplete(challenge, allChallenges, challengeProgress);
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
		border: 5px #27ae60 solid;
	}

	.incomplete.lock {
		border: 2px #c0392b solid;
	}

	.incomplete.unlock {
		border: 2px #2980b9 solid;
	}
</style>
