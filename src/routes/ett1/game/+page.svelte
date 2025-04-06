<script lang="ts">
	import { onMount } from 'svelte';
	import ChallengeView from '../../../components/ett1/ett1ChallengeView.svelte';
	import {
		sortEtt1Challenges,
		iterateEtt1Categories,
		type ETT1PublicChallengeDefinition,
		ett1ChallengeCategoryNames,
	} from '../../../types/ett1/challenge';
	import assertUnreachable from '../../../utils/assertUnreachable';
	import type { PageData } from './$types';
	import type { ETT1GameState } from '../../../types/ett1/game';
	import { isEtt1ChallengeComplete } from '../../../utils/ett1/challenge';

	export let data: PageData;
	let { allChallenges, gameState, team } = data;

	type TeamRank = { teamNum: number; score: number; name: string };
	let rankings: TeamRank[][] = [];
	$: teamRank =
		rankings.length === 0
			? '?'
			: `${rankings.findIndex((x) => x.some((y) => y.teamNum === team?.teamNum)) + 1}`;

	let hideComplete: boolean = false;

	$: sortedChallenges = sortEtt1Challenges(
		(hideComplete
			? allChallenges?.filter((x) => !isEtt1ChallengeComplete(x, team?.challengeProgress ?? {}))
			: allChallenges) ?? [],
	);

	let selectedChallenge: null | ETT1PublicChallengeDefinition = null;

	const openCallback = (c: ETT1PublicChallengeDefinition) => {
		if (selectedChallenge === null) {
			selectedChallenge = c;
		}
	};

	const gameStateUpdateTime = (gs?: ETT1GameState) => {
		if (!gs) {
			return 10000;
		}
		switch (gs.t) {
			case 'pre':
				return gs.countdown ? 1000 : 10000;
			case 'ongoing':
				return 20 * 1000;
			case 'post':
				return 60 * 1000;
			default:
				assertUnreachable(gs);
		}
	};
	const teamUpdateTime = (gs?: ETT1GameState) => (gs?.t === 'ongoing' ? 10 * 1000 : 30 * 1000);
	const challengeUpdateTime = 60 * 1000;
	const rankUpdateTime = (gs?: ETT1GameState) => (gs?.t === 'ongoing' ? 15 * 1000 : 60 * 1000);

	let teamUpdateInterval: ReturnType<typeof setInterval> | undefined;
	let challengeUpdateInterval: ReturnType<typeof setInterval> | undefined;
	let rankUpdateInterval: ReturnType<typeof setInterval> | undefined;

	onMount(() => {
		const updateTeamState = async () => {
			const newTeamRes = await fetch(`/ett1/game/api/team${window.location.search}`);
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
			const newChallengesRes = await fetch(`/ett1/game/api/challenges${window.location.search}`);
			if (newChallengesRes.ok) {
				try {
					const newChallenges = await newChallengesRes.json();
					if (newChallenges) {
						allChallenges = newChallenges as ETT1PublicChallengeDefinition[];
					}
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error(e);
				}
			}
		};

		const updateGameState = async () => {
			const newStateRes = await fetch('/ett1/game/api/game');
			if (newStateRes.ok) {
				const newState = (await newStateRes.json()) as ETT1GameState | undefined;
				if (newState) {
					if (gameState?.t !== newState.t) {
						clearInterval(teamUpdateInterval);
						teamUpdateInterval = setInterval(updateTeamState, teamUpdateTime(newState));

						clearInterval(rankUpdateInterval);
						rankUpdateInterval = setInterval(updateRank, rankUpdateTime(newState));

						clearInterval(challengeUpdateInterval);
						if (newState.t !== 'pre') {
							if (challengeUpdateInterval === undefined) {
								challengeUpdateInterval = setInterval(updateChallenges, challengeUpdateTime);
							}
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
		const updateRank = async () => {
			const newRankRes = await fetch(`/ett1/game/api/rank${window.location.search}`);
			if (newRankRes.ok) {
				try {
					const newRank = (await newRankRes.json()) as TeamRank[];
					if (newRank) {
						const res: Map<number, TeamRank[]> = new Map();
						newRank.forEach((t) => {
							const existing = res.get(t.score);
							if (existing) {
								res.set(t.score, existing.concat(t));
							} else {
								res.set(t.score, [t]);
							}
						});
						const arr = Array.from(res)
							.sort((a, b) => b[0] - a[0])
							.map(([_, teams]) => teams);
						rankings = arr;
					}
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error(e);
				}
			}
		};

		setTimeout(updateGameState, 1000);
		teamUpdateInterval = setInterval(updateTeamState, teamUpdateTime(gameState));
		rankUpdateInterval = setInterval(updateRank, rankUpdateTime(gameState));
		setTimeout(updateRank, 3000);

		if (gameState?.t === 'ongoing') {
			challengeUpdateInterval = setInterval(updateChallenges, challengeUpdateTime);
		}
	});

	function previewText(x: string): string {
		return x.replace(/<[^>]*>?/gm, '');
	}
</script>

<svelte:head>
	<title>Transit Trek: Team {team?.teamNum} Dashboard</title>
	<meta name="description" content="Seattle Transit Trek's August 2024 event, Hide and Seek 2" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin" />
	<link
		href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if team && gameState}
	<h1>{team.name || 'Untitled Team'}<br />Team {team.teamNum} Dashboard</h1>

	<div class="card">
		<p>This page is private and should only be viewed by members of your team.</p>
		<p>
			Keep the URL secret. If it's exposed, let Game Control know via Signal and we can generate a
			new link for you.
		</p>
	</div>

	<div class="card">
		<div class="multiCard">
			<div>
				<h2>Score</h2>
				<p class="timeString">{team.score}</p>
			</div>
			<div>
				<h2>Rank</h2>
				<p class="timeString">{gameState?.t === 'pre' ? '—' : teamRank}</p>
			</div>
		</div>
		{#if gameState?.t === 'pre' && gameState.countdown}
			<p>Standby. Game will start soon.</p>
		{:else if gameState?.t === 'pre'}
			<p>Game has not started yet.</p>
		{:else if gameState?.t === 'post'}
			<p>Game has concluded.</p>
		{:else}
			<span style="display: block; padding-bottom: 1em;"></span>
		{/if}
	</div>

	{#if !team.name || (!team.bioBreakTaken && gameState?.t === 'ongoing')}
		<div class="card">
			<h2>Notice</h2>
			{#if !team.name}
				<p>
					You have not provided us with a team name. Your team is not eligible to rank until a name
					is provided. Please let Game Control know of your team name once it is decided.
				</p>
			{:else if !team.bioBreakTaken}
				<p>Your team has not yet taken a bio break.</p>
				<p>Each team is required to take a 10 minute food/bio break sometime during the game.</p>
				<p>
					Your team is not eligible to win until your bio break is taken. Please let Game Control
					know when you start and end your break.
				</p>
			{/if}
		</div>
	{/if}

	{#if gameState.t === 'pre'}
		<div class="card">
			<h2>Challenges</h2>
			<p style="font-size: 100px;margin: 0;">🔒</p>
			<p>Challenges will be revealed when the game starts.</p>
		</div>
	{:else if allChallenges !== undefined}
		<div class="card">
			<h2>Challenges</h2>
			<p>Complete challenges to earn points.<br />Tap on any to see more details.</p>
			<label style="text-align: center;display: block; cursor: pointer;"
				><input type="checkbox" bind:checked={hideComplete} style="cursor: pointer;" /> Hide Completed</label
			>
		</div>

		{#each iterateEtt1Categories(sortedChallenges) as category}
			<div class={`card challenges ${category}`}>
				<h3>{ett1ChallengeCategoryNames[category]}</h3>
			</div>

			<div class={`curveIn ${category}`}></div>
			<ul class={`challengeList ${category}`}>
				{#each sortedChallenges[category] as challenge}
					<li>
						<button on:click={() => openCallback(challenge)}>
							{#if isEtt1ChallengeComplete(challenge, team.challengeProgress)}
								<span class="station done">✔</span>
							{:else}
								<span class="station"></span>
							{/if}
							<div class="wrap">
								<h4>{challenge.title}</h4>
								<p>{previewText(challenge.desc)}</p>
							</div>
							<span class="points">
								{challenge.points}<span style={challenge.points === 1 ? 'margin-right: 5px;' : ''}
									>pt{challenge.points === 1 ? '' : 's'}</span
								>
							</span>
						</button>
					</li>
				{/each}
			</ul>
			<div class={`curveOut ${category}`}></div>
		{/each}

		<div class="card" style="margin-top: 50px;">
			<h2>Standings</h2>
			{#if rankings.length > 0}
				<ol class="rankingList">
					{#each rankings as rank}
						<li>
							<span>{rank[0].score} point{rank[0].score === 1 ? '' : 's'}</span>
							<ul>
								{#each rank as t}
									<li>Team {t.teamNum}: {t.name || 'Untitled Team'}</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ol>
			{:else}
				<p>Rankings will be shown here in a few seconds.</p>
			{/if}
		</div>

		{#if selectedChallenge !== null}
			<ChallengeView
				challenge={selectedChallenge}
				challengeProgress={team.challengeProgress}
				closeCallback={() => {
					selectedChallenge = null;
				}}
				isFloat={true}
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
		font-family: 'ClearSansBold', 'Arial', sans-serif;
		font-weight: 900;

		margin-top: 0;
		padding: 50px 20px 30px 20px;
		box-sizing: border-box;
		width: 100%;
		font-size: 50px;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background-color: white;
		font-family: 'ClearSans', 'Arial', sans-serif;
	}

	@font-face {
		font-family: 'ClearSansBold';
		src: url('/ett1/ClearSans-Bold.ttf');
	}

	@font-face {
		font-family: 'ClearSans';
		src: url('/ett1/ClearSans-Regular.ttf');
	}

	.card {
		max-width: 500px;
		width: calc(100% - 50px);
		margin: 20px auto;
		padding: 30px 10px 20px 10px;

		background: rgb(240, 240, 240);
		border-bottom: 5px black solid;

		font-size: 20px;
		text-align: center;

		position: relative;
		z-index: 1;
	}

	.card h2 {
		margin: 5px 0 10px 0;
	}

	.card.challenges {
		padding: 10px 20px;
		background: none;
		border: none;
	}

	.card.challenges h3::before {
		display: inline-block;
		content: '';
		height: 12px;
		width: 48px;
		background: var(--color);
		margin-right: 1em;
	}

	.card.challenges h3 {
		font-weight: normal;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.card.challenges.challenge {
		--color: #3dae2b;
	}

	.card.challenges.find {
		--color: #00a0df;
	}

	.challengeList {
		padding: 0;
		list-style: none;

		max-width: 500px;
		width: calc(100% - 50px);
		margin: 0 auto;
	}

	.challengeList li {
		margin: 0;
		position: relative;
	}

	.challengeList button {
		border: none;
		color: black;
		width: 100%;
		padding: 20px 30px;
		background: white;
		border-left: 12px rgb(var(--color)) solid;
		cursor: pointer;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.challengeList .station {
		width: 40px;
		height: 40px;
		border-radius: 40px;
		box-sizing: border-box;
		background: white;
		position: absolute;
		top: 14px;
		left: -15px;
		border: 5px black solid;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.challengeList .station.done {
		background: black;
		font-size: 30px;
		overflow: hidden;
		border: none;
		color: white;
		font-weight: 900;
	}

	.challengeList.find .station {
		top: 30px;
	}

	.challengeList .points {
		display: flex;
		flex-direction: row;
		align-items: end;
		justify-content: center;
		font-size: 50px;
		margin-left: 20px;
		opacity: 0.6;
		font-family: 'ClearSansBold', 'Arial', sans-serif;
	}

	.challengeList .points > span {
		font-size: 12px;
		padding-bottom: 10px;
		padding-left: 2px;
		font-family: 'ClearSans', 'Arial', sans-serif;
	}

	.challengeList .wrap {
		display: block;
		flex-grow: 1;
		min-width: 0;
	}

	.challengeList .wrap h4 {
		font-size: 16px;
		margin: 0 0 5px 0;
		font-weight: bold;
		font-family: 'ClearSansBold', 'Arial', sans-serif;

		text-align: left;
	}

	.challengeList .wrap p {
		text-overflow: ellipsis;
		overflow: hidden;
		margin: 0;
		padding: 0;

		text-align: left;

		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.challengeList.challenge,
	.curveIn.challenge,
	.curveOut.challenge {
		--color: 61, 174, 43;
	}

	.challengeList.find,
	.curveIn.find,
	.curveOut.find {
		--color: 0, 160, 223;
	}

	.curveIn,
	.curveOut {
		height: 30px;
		width: max(calc(50% - 250px), 25px);

		border-right-style: solid;
		border-right-width: 12px;
		border-color: rgb(var(--color));

		position: relative;
	}

	.curveIn {
		border-top-style: solid;
		border-top-width: 12px;
		border-top-right-radius: 30px;
	}

	.curveOut {
		border-bottom-style: solid;
		border-bottom-width: 12px;
		border-bottom-right-radius: 30px;
	}

	.rankingList {
		counter-reset: item;
		list-style: none;
		padding: 0;
	}

	.rankingList > li {
		margin: 20px 0;
		padding: 15px 50px;
		position: relative;
		overflow: hidden;
	}

	.rankingList > li {
		padding: 15px 10px 15px 70px;
		counter-increment: item;
	}

	.rankingList > li::before {
		content: counter(item);
		position: absolute;
		left: 5px;
		top: 0;
		bottom: 0;
		width: 55px;
		text-align: center;
		font-size: 50px;
		font-weight: bold;
		font-family: 'ClearSansBold', 'Arial', sans-serif;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rankingList ul {
		list-style-type: '➤  ';
		padding-left: 30px;
	}

	.card .multiCard {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.card .multiCard > div {
		flex-grow: 1;
	}
</style>
