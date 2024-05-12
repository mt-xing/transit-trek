<script lang="ts">
	import type { PublicChallengeDefinition } from '../../types/challenge';
	import type { DashboardPassthroughInfo } from '../../types/map';
	import SingleChallengeBtn from './singleChallengeBtn.svelte';

	export let dashboardInfo: DashboardPassthroughInfo;
	$: ({ allChallenges } = dashboardInfo);
	export let openCallback: (c: PublicChallengeDefinition) => void;
	export let mapPos: number;

	$: challenges = allChallenges.filter((x) => x.mapPos === mapPos);
</script>

<div>
	{#each challenges as c}
		<SingleChallengeBtn {dashboardInfo} {openCallback} challenge={c} />
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
	}
</style>
