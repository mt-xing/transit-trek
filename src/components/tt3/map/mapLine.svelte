<script lang="ts">
	import type { TT3PublicChallengeDefinition } from '../../../types/tt3/challenge';
	import type { TT3DashboardPassthroughInfo } from '../../../types/tt3/map';
	import { isChallengeComplete, isChallengeUnlocked } from '../../../utils/challenge';
	import ChallengeBtns from '../challengeBtns/challengeBtns.svelte';

	export let dir: 'vert' | 'left' | 'right' | 'dot' | 'arcleft' | 'arcright' | 'short';
	export let mapPos: number;
	export let mapInfo:
		| {
				t: 'after' | 'before';
		  }
		| {
				t: 'inline';
				openCallback: (c: TT3PublicChallengeDefinition) => void;
		  };
	export let dashboardInfo: TT3DashboardPassthroughInfo;
	$: ({ allChallenges } = dashboardInfo);

	$: challenges = allChallenges.filter((x) => x.mapPos === mapPos);

	$: isUnlocked = challenges.some((x) => isChallengeUnlocked(x, dashboardInfo));
	$: isComplete = challenges.some((x) => isChallengeComplete(x, dashboardInfo));
</script>

<div
	class={`line ${dir} ${isUnlocked ? 'unlock' : 'lock'} ${isComplete ? 'done' : 'incomplete'} ${mapInfo.t}`}
></div>

{#if mapInfo.t === 'inline'}
	<div class={`challengeBtns ${dir}`}>
		<ChallengeBtns {dashboardInfo} openCallback={mapInfo.openCallback} {mapPos} />
	</div>
{/if}

{#if dir === 'arcleft' || dir === 'arcright'}
	<div
		class={`line ${dir} ${isUnlocked ? 'unlock' : 'lock'} ${isComplete ? 'done' : 'incomplete'} ${mapInfo.t} second`}
	></div>
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
	}

	.line.incomplete.unlock.inline {
		background: linear-gradient(to bottom, #2980b9 49%, #7f8c8d 51%);
	}

	.line.incomplete.unlock.before {
		background: #2980b9;
	}

	.line.vert {
		top: -15px;
		left: 13px;
		height: 130px;
	}
	.line.vert.done {
		left: 10px;
	}

	.line.short {
		top: -15px;
		left: 13px;
		height: 60px;
	}
	.line.short.done {
		left: 10px;
	}

	.line.dot {
		top: 13px;
		left: 13px;
		height: 4px;
		border-radius: 2px;
	}
	.line.dot.done {
		top: 10px;
		left: 10px;
		height: 10px;
		border-radius: 5px;
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

	.line.arcleft {
		top: -15px;
		right: -113px;
		height: 82px;
		transform: rotate(37.568592deg);
		transform-origin: top center;
	}
	.line.arcleft.done {
		right: -110px;
	}
	.line.arcleft.second {
		right: unset;
		top: -83px;
		left: 63px;
		height: 82px;
		transform: rotate(-37.568592deg);
		transform-origin: top center;
	}
	.line.arcleft.done.second {
		left: 60px;
	}

	.line.arcright {
		top: -15px;
		left: -87px;
		height: 82px;
		transform: rotate(-37.568592deg);
		transform-origin: top center;
	}
	.line.arcright.done {
		left: -90px;
	}
	.line.arcright.second {
		right: unset;
		top: -83px;
		left: -38px;
		height: 82px;
		transform: rotate(37.568592deg);
		transform-origin: top center;
	}
	.line.arcright.done.second {
		left: -41px;
	}

	.line.incomplete.unlock.inline.arcleft,
	.line.incomplete.unlock.inline.arcright {
		background: #2980b9;
	}

	.line.incomplete.unlock.inline.arcleft.second,
	.line.incomplete.unlock.inline.arcright.second {
		background: #7f8c8d;
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

	.challengeBtns.arcleft {
		top: -58px;
		left: 15px;
		z-index: 2;
	}

	.challengeBtns.arcright {
		top: -58px;
		left: -85px;
		z-index: 2;
	}
</style>
