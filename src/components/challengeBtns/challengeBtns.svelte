<script lang="ts">
	import type { PublicChallengeDefinition } from '../../types/challenge';
	import type { ChallengeProgress } from '../../types/team';
	import SingleChallengeBtn from './singleChallengeBtn.svelte';

	export let allChallenges: PublicChallengeDefinition[];
	export let challengeProgress: ChallengeProgress;
	export let openCallback: (c: PublicChallengeDefinition) => void;
	export let mapPos: number;

	$: challenges = allChallenges.filter((x) => x.mapPos === mapPos);
</script>

<div>
	{#each challenges as c}
		<SingleChallengeBtn {allChallenges} {challengeProgress} {openCallback} challenge={c} />
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 50px;
		width: 100px;
		background: white;
	}
</style>
