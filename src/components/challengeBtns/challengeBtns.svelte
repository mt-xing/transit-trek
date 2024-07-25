<script lang="ts">
	import type { TT3PublicChallengeDefinition } from '../../types/tt3/challenge';
	import type { TT3DashboardPassthroughInfo } from '../../types/tt3/map';
	import SingleChallengeBtn from './singleChallengeBtn.svelte';

	export let dashboardInfo: TT3DashboardPassthroughInfo;
	$: ({ allChallenges } = dashboardInfo);
	export let openCallback: (c: TT3PublicChallengeDefinition) => void;
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
