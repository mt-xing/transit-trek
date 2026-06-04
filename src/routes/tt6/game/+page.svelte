<script lang="ts">
	import { onMount } from 'svelte';
	import ChallengeView from '../../../components/tt6/tt6ChallengeView.svelte';
	import {
		sortTt6Challenges,
		iterateTt6Categories,
		type TT6PublicChallengeDefinition,
		tt6ChallengeCategoryNames,
	} from '../../../types/tt6/challenge';
	import assertUnreachable from '../../../utils/assertUnreachable';
	import type { PageData } from './$types';
	import type { TT6GameState } from '../../../types/tt6/game';
	import { isTt6ChallengeComplete } from '../../../utils/tt6/challenge';
	import Tt6DashboardCard from '../../../components/tt6/tt6DashboardCard.svelte';
	import { tt6ColorName } from '../../../utils/tt6/colorName';

	export let data: PageData;
	let { allChallenges, gameState, team } = data;

	type TeamRank = { teamNum: number; score: number; name: string };
	let rankings: TeamRank[][] = [];
	$: teamRank =
		rankings.length === 0
			? '?'
			: `${rankings.findIndex((x) => x.some((y) => y.teamNum === team?.teamNum)) + 1}`;

	let hideComplete: boolean = false;

	$: sortedChallenges = sortTt6Challenges(
		(hideComplete
			? allChallenges?.filter((x) => !isTt6ChallengeComplete(x, team?.challengeProgress ?? {}))
			: allChallenges) ?? [],
	);

	let selectedChallenge: null | TT6PublicChallengeDefinition = null;

	const openCallback = (c: TT6PublicChallengeDefinition) => {
		if (selectedChallenge === null) {
			selectedChallenge = c;
		}
	};

	const gameStateUpdateTime = (gs?: TT6GameState) => {
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
	const teamUpdateTime = (gs?: TT6GameState) => (gs?.t === 'ongoing' ? 10 * 1000 : 30 * 1000);
	const challengeUpdateTime = 60 * 1000;
	const rankUpdateTime = (gs?: TT6GameState) => (gs?.t === 'ongoing' ? 15 * 1000 : 60 * 1000);

	let teamUpdateInterval: ReturnType<typeof setInterval> | undefined;
	let challengeUpdateInterval: ReturnType<typeof setInterval> | undefined;
	let rankUpdateInterval: ReturnType<typeof setInterval> | undefined;

	onMount(() => {
		const updateTeamState = async () => {
			const newTeamRes = await fetch(`/tt6/game/api/team${window.location.search}`);
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
			const newChallengesRes = await fetch(`/tt6/game/api/challenges${window.location.search}`);
			if (newChallengesRes.ok) {
				try {
					const newChallenges = await newChallengesRes.json();
					if (newChallenges) {
						allChallenges = newChallenges as TT6PublicChallengeDefinition[];
					}
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error(e);
				}
			}
		};

		const updateGameState = async () => {
			const newStateRes = await fetch('/tt6/game/api/game');
			if (newStateRes.ok) {
				const newState = (await newStateRes.json()) as TT6GameState | undefined;
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
			const newRankRes = await fetch(`/tt6/game/api/rank${window.location.search}`);
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

<svg width="0" height="0" style="position: absolute;">
	<filter id="knockout-glow">
		<feComponentTransfer in="SourceAlpha" result="solid-alpha">
			<feFuncA type="linear" slope="100" />
		</feComponentTransfer>
		<feGaussianBlur in="solid-alpha" stdDeviation="8" result="glow-blur" />
		<feFlood flood-color="#ffffff" result="glow-color" />
		<feComposite in="glow-color" in2="glow-blur" operator="in" result="colored-glow" />
		<feComposite in="colored-glow" in2="solid-alpha" operator="out" result="glow-outside-only" />
		<feMerge>
			<feMergeNode in="glow-outside-only" />
			<feMergeNode in="SourceGraphic" />
		</feMerge>
	</filter>
</svg>

<div id="bg"></div>

{#if team && gameState}
	<Tt6DashboardCard>
		<h1 class="topTitle">{team.name || '⚠️ Untitled Team'}</h1>
		<h1 class="bottomTitle">
			Team {team.teamNum} Dashboard
		</h1>
	</Tt6DashboardCard>

	<Tt6DashboardCard>
		<p>This page is private and should only be viewed by members of your team.</p>
		<p>
			Keep the URL secret. If it's exposed, let Game Control know via Signal and we can generate a
			new link for you.
		</p>
	</Tt6DashboardCard>

	<Tt6DashboardCard>
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
	</Tt6DashboardCard>

	{#if !team.name || (!team.bioBreakTaken && gameState?.t === 'ongoing')}
		<Tt6DashboardCard>
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
		</Tt6DashboardCard>
	{/if}

	{#if gameState.t === 'pre'}
		<Tt6DashboardCard>
			<h2>Challenges</h2>
			<p style="font-size: 100px;margin: 0;">🔒</p>
			<p>Challenges will be revealed when the game starts.</p>
		</Tt6DashboardCard>
	{:else if allChallenges !== undefined}
		<Tt6DashboardCard>
			<h2>Challenges</h2>
			<p>Complete challenges to earn points.<br />Tap on any to see more details.</p>
			<label style="text-align: center;display: block; cursor: pointer;"
				><input type="checkbox" bind:checked={hideComplete} style="cursor: pointer;" /> Hide Completed</label
			>
		</Tt6DashboardCard>

		{#each iterateTt6Categories(sortedChallenges) as category}
			<Tt6DashboardCard color={tt6ColorName(category)} small>
				<h3>{tt6ChallengeCategoryNames[category]}</h3>
				{#if category === 'hard'}
					<p style="width: 90%; max-width: 800px; margin: 0 auto 1em auto; font-size: 18px;">
						You must have earned at least 80 points so far to <em
							style="text-decoration: underline;">begin</em
						> these challenges.
					</p>
					{#if team.score < 80}
						<p style="width: 90%; max-width: 800px; margin: 0 auto 1.5em auto; font-size: 18px;">
							⚠️ Your team does not have enough points.
						</p>
					{/if}
				{/if}
			</Tt6DashboardCard>

			<ul class={`challengeList ${category}`}>
				{#each sortedChallenges[category] as challenge}
					<li>
						<button on:click={() => openCallback(challenge)}>
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
		{/each}

		<Tt6DashboardCard>
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
		</Tt6DashboardCard>

		{#if selectedChallenge !== null}
			<ChallengeView
				challenge={selectedChallenge}
				challengeProgress={team.challengeProgress}
				closeCallback={() => {
					selectedChallenge = null;
				}}
				isFloat={true}
				score={team.score}
			/>
		{/if}
	{/if}
{:else}
	<h1>Invalid Link :(</h1>

	<Tt6DashboardCard>
		<p>This team URL is not valid.</p>
		<p>
			If this used to be your team's link, it may have been changed. Contact Game Control for help.
		</p>
	</Tt6DashboardCard>
{/if}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background: black;
		color: white;
	}

	#bg {
		background-image: url($lib/images/tt6/bg.jpg);
		background-position: center;
		background-size: cover;
		position: fixed;
		z-index: -1;
		left: 0;
		top: 0;
		height: 100vh;
		width: 100vw;
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
		font-weight: 900;

		margin-top: 0;
		padding: 50px 20px 30px 20px;
		box-sizing: border-box;
		width: 100%;
		font-size: 50px;
	}

	.topTitle {
		margin: 0.5em 0 0 0;
		padding: 0;
		font-weight: normal;
	}

	.bottomTitle {
		margin: 0 0 0.25em 0;
		padding: 0;
		position: relative;
	}

	.challengeList {
		padding: 0;
		list-style: none;

		max-width: 500px;
		width: calc(100% - 50px);
		margin: 0 auto;
	}

	.challengeList li {
		margin: 1em 0;
		position: relative;
	}

	.challengeList.challenge button {
		background: linear-gradient(
			to top,
			rgba(1, 128, 1, 0.7),
			rgba(4, 64, 8, 0.7) 30%,
			rgba(2, 34, 5, 0.7)
		);
		--accent-color: #3dae2b;
	}

	.challengeList.find button {
		background: linear-gradient(
			to top,
			rgba(64, 1, 128, 0.7),
			rgba(32, 4, 64, 0.5) 30%,
			rgba(15, 2, 34, 0.7)
		);
		--accent-color: #af50df;
	}

	.challengeList.hard button {
		background: linear-gradient(
			to top,
			rgba(128, 1, 1, 0.7),
			rgba(64, 4, 8, 0.5) 30%,
			rgba(34, 2, 5, 0.7)
		);
		--accent-color: #8a2631;
	}

	.challengeList button {
		--notch: 3em;
		clip-path: polygon(
			var(--notch) 0%,
			100% 0%,
			100% calc(100% - var(--notch)),
			calc(100% - var(--notch)) 100%,
			0% 100%,
			0% var(--notch)
		);

		border: none;
		border-top: 2px solid var(--accent-color);
		color: white;

		width: 100%;
		padding: 20px 30px;
		cursor: pointer;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.challengeList .points {
		display: flex;
		flex-direction: row;
		align-items: end;
		justify-content: center;
		font-size: 50px;
		margin-left: 20px;
		opacity: 0.6;
	}

	.challengeList .points > span {
		font-size: 12px;
		padding-bottom: 10px;
		padding-left: 2px;
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

	.challengeList.challenge {
		--color: 61, 174, 43;
	}

	.challengeList.find {
		--color: 0, 160, 223;
	}

	.challengeList.hard {
		--color: 138, 38, 49;
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
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.rankingList ul {
		list-style-type: '➤  ';
		padding-left: 30px;
	}

	.multiCard {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.multiCard h2 {
		margin-bottom: 0.5em;
	}

	.multiCard > div {
		flex-grow: 1;
	}

	h2 {
		margin-bottom: 0;
	}
</style>
