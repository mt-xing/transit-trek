<script lang="ts">
	import type { PublicChallengeDefinition } from '../../types/challenge';
	import type { DashboardPassthroughInfo } from '../../types/map';
	import { isChallengeComplete, isChallengeUnlocked } from '../../utils/challenge';
	import ChallengeBtns from '../challengeBtns/challengeBtns.svelte';

	export let dir: 'vert' | 'left' | 'right';
	export let mapPos: number;
	export let mapInfo:
		| {
				t: 'after';
		  }
		| {
				t: 'inline';
				openCallback: (c: PublicChallengeDefinition) => void;
		  };
	export let dashboardInfo: DashboardPassthroughInfo;
	$: ({ allChallenges } = dashboardInfo);

	$: challenges = allChallenges.filter((x) => x.mapPos === mapPos);

	$: isUnlocked = challenges.some((x) => isChallengeUnlocked(x, dashboardInfo));
	$: isComplete = challenges.some((x) => isChallengeComplete(x, dashboardInfo));
</script>

<div
	class={`line ${dir} ${isUnlocked ? 'unlock' : 'lock'} ${isComplete ? 'done' : 'incomplete'} ${mapInfo.t === 'inline' ? 'inline' : 'after'}`}
></div>

{#if mapInfo.t === 'inline'}
	<div class={`challengeBtns ${dir}`}>
		<ChallengeBtns {dashboardInfo} openCallback={mapInfo.openCallback} {mapPos} />
	</div>
{/if}

<style>
	.line {
		background: #7f8c8d;
		box-sizing: border-box;
		position: relative;
		width: 4px;
	}

	.line.done {
		background: #27ae60;
		width: 10px;
		border-radius: 5px;
	}

	.line.incomplete.unlock.inline {
		background: linear-gradient(to bottom, #2980b9 49%, #7f8c8d 51%);
	}

	.line.vert {
		top: -15px;
		left: 13px;
		height: 130px;
	}
	.line.vert.done {
		left: 10px;
	}

	.line.right {
		top: -15px;
		left: -87px;
		height: 164px;
		transform: rotate(-37.568592deg);
		transform-origin: top center;
	}
	.line.right.done {
		left: -90px;
	}

	.line.left {
		top: -15px;
		right: -113px;
		height: 164px;
		transform: rotate(37.568592deg);
		transform-origin: top center;
	}
	.line.left.done {
		right: -110px;
	}

	.challengeBtns {
		position: relative;
		top: -105px;
		left: -35px;
	}

	.challengeBtns.left {
		top: -140px;
		left: 15px;
	}

	.challengeBtns.right {
		top: -140px;
		left: -85px;
	}
</style>
