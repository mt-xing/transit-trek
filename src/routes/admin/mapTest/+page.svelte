<script lang="ts">
	import ChallengeView from '../../../components/challengeView.svelte';
	import Map from '../../../components/map/map.svelte';
	import type { PublicChallengeDefinition } from '../../../types/challenge';
	import type { PageData } from './$types';

	export let data: PageData;
	const { allChallenges, startTime } = data;
	const challengeProgress = {
		'b2afe19c-d245-4461-89e2-d373371e354a': { progress: [true] },
		'a84efa50-22d3-4ff9-860f-c4f010756fdc': { progress: [true], manualUnlock: true },
		'3b914c8f-e728-41d5-a142-b27f19aba575': { progress: [true] },
		'843bbbb0-3ab1-417a-a1b4-a69bb06ec7af': { progress: [true, true, true] },
		'08e2fc05-fca2-4f35-90ca-94e959d6571f': {
			progress: [true, true],
			manualUnlock: true,
			manualComplete: false,
		},
		'6aed52ef-df4f-4bba-9fac-8aed85ce04b2': {
			manualUnlock: true,
			progress: undefined,
		},
	};
	const teamPenalty = 10;

	let selectedChallenge: null | PublicChallengeDefinition = null;

	let timeString = '--:--:--';
	function padToTwo(x: number) {
		if (x < 10) {
			return `0${x}`;
		}
		return x;
	}
	function updateTimeString() {
		const d = new Date().getTime();
		const delta = d - startTime;

		if (delta < 0) {
			timeString = 'Game has not started yet';
		} else {
			const hours = Math.floor(delta / 1000 / 60 / 60);
			const rawMins = delta - hours * 60 * 60 * 1000;
			const min = Math.floor(rawMins / 1000 / 60);
			const sec = Math.floor((rawMins - min * 60 * 1000) / 1000);
			timeString = `${padToTwo(hours)}:${padToTwo(min)}:${padToTwo(sec)}`;
		}
	}

	let clear: ReturnType<typeof setInterval> | undefined;
	$: {
		clearInterval(clear);
		clear = setInterval(updateTimeString, 1000);
	}
</script>

<h1>Team 0: <em>Test Team</em></h1>
<p>This page is private and should only be viewed by members of your team.</p>
<p>
	Keep the URL secret. If it's accidentally exposed, let Game Control know via Signal and we can
	generate a new link for you.
</p>

<h2>Time</h2>
<p class="timeString">{timeString}</p>
{#if teamPenalty > 0}
	<p>+{teamPenalty} minute penalty</p>
{:else if teamPenalty < 0}
	<p>-{-1 * teamPenalty} minute handicap</p>
{/if}

{#if allChallenges}
	<div class="map">
		<Map
			{allChallenges}
			{challengeProgress}
			openCallback={(c) => {
				if (selectedChallenge === null) {
					selectedChallenge = c;
				}
			}}
		/>
	</div>
{/if}

{#if selectedChallenge !== null}
	<ChallengeView
		challenge={selectedChallenge}
		{allChallenges}
		allChallengeProgress={challengeProgress}
		closeCallback={() => {
			selectedChallenge = null;
		}}
	/>
{/if}

<style>
	.map {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1,
	h2,
	p {
		text-align: center;
		padding: 0 10px;
	}

	.timeString {
		font-family: 'Consolas', monospace;
		font-size: 2em;
		margin: 0;
	}

	h1 {
		background: #2c3e50;
		color: white;
		margin-top: 0;
		padding: 50px 0;
		text-shadow: 0 0 15px black;
		font-size: 40px;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
