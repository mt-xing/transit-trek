<script lang="ts">
	import SingleChallengeBtn from '../../../components/challengeBtns/singleChallengeBtn.svelte';
	import ChallengeView from '../../../components/challengeView.svelte';
	import Map from '../../../components/map/map.svelte';
	import type { PublicChallengeDefinition } from '../../../types/challenge';
	import assertUnreachable from '../../../utils/assertUnreachable';
	import type { PageData } from './$types';

	export let data: PageData;
	const { allChallenges, gameState, team } = data;
	const { challengeProgress, timePenaltyMin } = team;

	let selectedChallenge: null | PublicChallengeDefinition = null;

	let timeString = '--:--:--';
	function padToTwo(x: number) {
		if (x < 10) {
			return `0${x}`;
		}
		return x;
	}
	function updateTimeString() {
		switch (gameState?.t) {
			case undefined:
			case 'pre':
				timeString = '00:00:00';
				return;
			case 'post':
			case 'ongoing':
				break;
			default:
				assertUnreachable(gameState);
		}

		const d = gameState.t === 'ongoing' ? new Date().getTime() : team.finishTime;
		if ((gameState.t === 'post' && !team.finishTime) || !d) {
			timeString = 'Did Not Finish';
			return;
		}
		const delta = d - gameState.startTime + team.timePenaltyMin * 60 * 1000;

		if (delta < 0) {
			timeString = '00:00:00';
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

	const openCallback = (c: PublicChallengeDefinition) => {
		if (selectedChallenge === null) {
			selectedChallenge = c;
		}
	};
</script>

<svelte:head>
	<title>Transit Trek: Team {team.teamNum} Dashboard</title>
	<meta name="description" content="Seattle Transit Trek's May 2024 event, Race Across Seattle" />
</svelte:head>

<h1><em>{team.name || 'Untitled Team'}</em><br />Team {team.teamNum} Dashboard</h1>

<div class="card">
	<p>This page is private and should only be viewed by members of your team.</p>
	<p>
		Keep the URL secret. If it's accidentally exposed, let Game Control know via Signal and we can
		generate a new link for you.
	</p>
</div>

<div class="card">
	<h2>Time</h2>
	<p class="timeString">{timeString}</p>
	{#if gameState?.t === 'ongoing' || gameState?.t === 'post'}
		{#if timePenaltyMin > 0}
			<p>(includes +{timePenaltyMin} minute penalty)</p>
		{:else if timePenaltyMin < 0}
			<p>(includes {timePenaltyMin} minute handicap)</p>
		{/if}
	{:else}
		<p>Game has not started yet</p>
	{/if}
	{#if gameState?.t === 'post'}
		<p>Game has concluded.</p>
	{/if}
</div>

<div class="card">
	<h2>Anytime Challenges</h2>
	<p>Completing these will result in additional time being returned to your final score.</p>
	<div class="anytimes">
		{#each allChallenges.filter((x) => x.mapPos === 99) as c}
			<span>
				<SingleChallengeBtn {allChallenges} {challengeProgress} {openCallback} challenge={c} />
			</span>
		{/each}
	</div>
</div>

<div class="card">
	<h2>Map</h2>
	{#if allChallenges}
		<div class="map">
			<Map {allChallenges} {challengeProgress} {openCallback} />
		</div>
	{/if}
</div>

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
		padding: 50px 20px 160px 20px;
		box-sizing: border-box;
		width: 100%;
		text-shadow: 0 0 15px black;
		font-size: 40px;
		margin-bottom: -140px;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background: #ecf0f1;
	}

	.card {
		background: white;
		max-width: 500px;
		width: calc(100% - 50px);
		margin: 20px auto;
		padding: 20px 10px;
		box-sizing: border-box;
		border-radius: 15px;
		box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.2);
		overflow-x: hidden;
	}

	.card h2 {
		margin: 5px 0 10px 0;
	}

	.anytimes {
		text-align: center;
	}

	.anytimes > span {
		margin: 0 5px;
	}
</style>
