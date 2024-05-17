<script lang="ts">
	import { onMount } from 'svelte';
	import SingleChallengeBtn from '../../components/challengeBtns/singleChallengeBtn.svelte';
	import ChallengeView from '../../components/challengeView.svelte';
	import Map from '../../components/map/map.svelte';
	import type { PublicChallengeDefinition } from '../../types/challenge';
	import assertUnreachable from '../../utils/assertUnreachable';
	import type { PageData } from './$types';
	import type { GameState } from '../../types/game';

	export let data: PageData;
	let { allChallenges, gameState, team } = data;
	$: dashboardInfo = {
		allChallenges: allChallenges ?? [],
		gameState: gameState ?? { t: 'pre', countdown: false },
		challengeProgress: team?.challengeProgress ?? {},
	};

	let selectedChallenge: null | PublicChallengeDefinition = null;

	let timeString = '--:--:--';
	function padToTwo(x: number) {
		if (x < 10) {
			return `0${x}`;
		}
		return x;
	}
	function updateTimeString() {
		if (!team) {
			return;
		}
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

		if (gameState.t === 'post' && !team.finishTime) {
			timeString = 'Did Not Finish';
			return;
		}

		const d = team.finishTime ?? new Date().getTime();
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
	onMount(updateTimeString);

	const openCallback = (c: PublicChallengeDefinition) => {
		if (selectedChallenge === null) {
			selectedChallenge = c;
		}
	};

	const gameStateUpdateTime = (gs?: GameState) => {
		if (!gs) {
			return 10000;
		}
		switch (gs.t) {
			case 'pre':
				return gs.countdown ? 1000 : 10000;
			case 'ongoing':
			case 'post':
				return 60 * 1000;
			default:
				assertUnreachable(gs);
		}
	};
	const teamUpdateTime = (gs?: GameState) => (gs?.t === 'ongoing' ? 10 * 1000 : 30 * 1000);
	const challengeUpdateTime = 60 * 1000;

	let teamUpdateInterval: ReturnType<typeof setInterval> | undefined;
	let challengeUpdateInterval: ReturnType<typeof setInterval> | undefined;

	onMount(() => {
		const updateTeamState = async () => {
			const newTeamRes = await fetch(`/game/api/team${window.location.search}`);
			if (newTeamRes.ok) {
				try {
					const newTeam = await newTeamRes.json();
					if (newTeam) {
						team = newTeam;
					}
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error(e);
				}
			}
		};

		const updateChallenges = async () => {
			const newChallengesRes = await fetch(`/game/api/challenges${window.location.search}`);
			if (newChallengesRes.ok) {
				try {
					const newChallenges = await newChallengesRes.json();
					if (newChallenges) {
						allChallenges = newChallenges as PublicChallengeDefinition[];
					}
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error(e);
				}
			}
		};

		const updateGameState = async () => {
			const newStateRes = await fetch('/game/api/game');
			if (newStateRes.ok) {
				const newState = (await newStateRes.json()) as GameState | undefined;
				if (newState) {
					if (gameState?.t !== newState.t) {
						clearInterval(teamUpdateInterval);
						teamUpdateInterval = setInterval(updateTeamState, teamUpdateTime(newState));

						clearInterval(challengeUpdateInterval);
						if (newState.t !== 'pre') {
							challengeUpdateInterval = setInterval(updateChallenges, challengeUpdateTime);
							if (newState.t === 'ongoing') {
								updateChallenges();
							}
						}
					}
					gameState = newState;
				}
			}
			setTimeout(updateGameState, gameStateUpdateTime(gameState));
		};

		setTimeout(updateGameState, 1000);
		teamUpdateInterval = setInterval(updateTeamState, teamUpdateTime(gameState));
	});
</script>

<svelte:head>
	<title>Transit Trek: Team {team?.teamNum} Dashboard</title>
	<meta name="description" content="Seattle Transit Trek's May 2024 event, Race Across Seattle" />
</svelte:head>

{#if team && gameState}
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
			{#if team.timePenaltyMin > 0}
				<p>(includes +{team.timePenaltyMin} minute penalty)</p>
			{:else if team.timePenaltyMin < 0}
				<p>(includes {team.timePenaltyMin} minute handicap)</p>
			{/if}
		{:else if gameState?.t === 'pre' && gameState.countdown}
			<p>Standby. Game will start soon.</p>
		{:else}
			<p>Game has not started yet.</p>
		{/if}
		{#if gameState?.t === 'post'}
			<p>Game has concluded.</p>
		{/if}
		{#if gameState?.t === 'ongoing' && team.finishTime}
			<p>Congratulations on finishing!</p>
		{/if}
	</div>

	{#if gameState.t === 'pre'}
		<div class="card">
			<h2>Challenges</h2>
			<p style="font-size: 100px;margin: 0;">🔒</p>
			<p>Challenges will be revealed when the game starts.</p>
		</div>
	{:else if allChallenges !== undefined}
		<div class="card">
			<h2>Anytime Challenges</h2>
			<p>Completing these will result in additional time being returned to your final score.</p>
			<div class="anytimes">
				{#each allChallenges
					.filter((x) => x.mapPos === 99)
					.sort((a, b) => a.title.localeCompare(b.title)) as c}
					<span>
						<SingleChallengeBtn {dashboardInfo} {openCallback} challenge={c} />
					</span>
				{/each}
			</div>
		</div>

		<div class="card">
			<h2>Map</h2>
			{#if allChallenges}
				<div class="map">
					<Map {dashboardInfo} {openCallback} />
				</div>
			{/if}
		</div>

		{#if selectedChallenge !== null}
			<ChallengeView
				challenge={selectedChallenge}
				{dashboardInfo}
				closeCallback={() => {
					selectedChallenge = null;
				}}
			/>
		{/if}
	{/if}
{:else}
	<h1>Invalid Link :(</h1>

	<div class="card">
		<p>This team URL is not valid.</p>
		<p>
			If this used to be your team's link, it may have been changed. Contact Game Control for help.
		</p>
	</div>
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
