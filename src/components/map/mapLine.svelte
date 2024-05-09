<script lang="ts">
	import type { PublicChallengeDefinition } from '../../types/challenge';
	import type { ChallengeProgress } from '../../types/team';
	import ChallengeBtns from '../challengeBtns/challengeBtns.svelte';

	export let dir: 'vert' | 'left' | 'right';
	export let mapPos: number;
	export let mapInfo:
		| {
				t: 'after';
		  }
		| {
				t: 'inline';
				allChallenges: PublicChallengeDefinition[];
				challengeProgress: ChallengeProgress;
				openCallback: (c: PublicChallengeDefinition) => void;
		  };
</script>

<div class={`line ${dir}`}></div>

{#if mapInfo.t === 'inline'}
	<div class={`challengeBtns ${dir}`}>
		<ChallengeBtns
			allChallenges={mapInfo.allChallenges}
			challengeProgress={mapInfo.challengeProgress}
			openCallback={mapInfo.openCallback}
			{mapPos}
		/>
	</div>
{/if}

<style>
	.line {
		background: #7f8c8d;
		box-sizing: border-box;
		position: relative;
	}

	.line.vert {
		top: -15px;
		left: 14px;
		width: 2px;
		height: 130px;
	}

	.line.right {
		top: -15px;
		left: -86px;
		height: 164px;
		width: 2px;
		transform: rotate(-37.568592deg);
		transform-origin: top center;
	}

	.line.left {
		top: -15px;
		right: -114px;
		height: 164px;
		width: 2px;
		transform: rotate(37.568592deg);
		transform-origin: top center;
	}

	.challengeBtns {
		position: relative;
		top: -130px;
		left: -35px;
	}

	.challengeBtns.left {
		top: -165px;
		left: 15px;
	}

	.challengeBtns.right {
		top: -165px;
		left: -85px;
	}
</style>
