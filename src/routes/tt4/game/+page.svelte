<script lang="ts">
	import { onMount } from 'svelte';
	import ChallengeView from '../../../components/tt4/tt4ChallengeView.svelte';
	import {
		sortTt4Challenges,
		iterateTt4Categories,
		type TT4PublicChallengeDefinition,
		tt4ChallengeCategoryNames,
	} from '../../../types/tt4/challenge';
	import assertUnreachable from '../../../utils/assertUnreachable';
	import type { PageData } from './$types';
	import type { TT4GameState } from '../../../types/tt4/game';
	import { canTt4TeamBeCaught, remainingSafeTimeTt4 } from '../../../utils/tt4/catch';
	import { isTt4ChallengeComplete } from '../../../utils/tt4/challenge';

	export let data: PageData;
	let { allChallenges, gameState, team } = data;

	type TeamRank = { teamNum: number; score: number; name: string };
	let rankings: TeamRank[][] = [];
	$: teamRank =
		rankings.length === 0
			? '?'
			: `${rankings.findIndex((x) => x.some((y) => y.teamNum === team?.teamNum)) + 1}`;

	let hideComplete: boolean = false;

	$: sortedChallenges = sortTt4Challenges(
		(hideComplete
			? allChallenges?.filter((x) => !isTt4ChallengeComplete(x, team?.challengeProgress ?? {}))
			: allChallenges) ?? [],
	);

	let selectedChallenge: null | TT4PublicChallengeDefinition = null;

	const openCallback = (c: TT4PublicChallengeDefinition) => {
		if (selectedChallenge === null) {
			selectedChallenge = c;
		}
	};

	const gameStateUpdateTime = (gs?: TT4GameState) => {
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
	const teamUpdateTime = (gs?: TT4GameState) => (gs?.t === 'ongoing' ? 10 * 1000 : 30 * 1000);
	const challengeUpdateTime = 60 * 1000;
	const rankUpdateTime = (gs?: TT4GameState) => (gs?.t === 'ongoing' ? 15 * 1000 : 60 * 1000);

	let teamUpdateInterval: ReturnType<typeof setInterval> | undefined;
	let challengeUpdateInterval: ReturnType<typeof setInterval> | undefined;
	let rankUpdateInterval: ReturnType<typeof setInterval> | undefined;

	onMount(() => {
		loaded = true;

		const updateTeamState = async () => {
			const newTeamRes = await fetch(`/tt4/game/api/team${window.location.search}`);
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
			const newChallengesRes = await fetch(`/tt4/game/api/challenges${window.location.search}`);
			if (newChallengesRes.ok) {
				try {
					const newChallenges = await newChallengesRes.json();
					if (newChallenges) {
						allChallenges = newChallenges as TT4PublicChallengeDefinition[];
					}
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error(e);
				}
			}
		};

		const updateGameState = async () => {
			const newStateRes = await fetch('/tt4/game/api/game');
			if (newStateRes.ok) {
				const newState = (await newStateRes.json()) as TT4GameState | undefined;
				if (newState) {
					if (gameState?.t !== newState.t) {
						clearInterval(teamUpdateInterval);
						teamUpdateInterval = setInterval(updateTeamState, teamUpdateTime(newState));

						clearInterval(rankUpdateInterval);
						rankUpdateInterval = setInterval(updateRank, rankUpdateTime(newState));

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
		const updateRank = async () => {
			const newRankRes = await fetch(`/tt4/game/api/rank${window.location.search}`);
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
	});

	let caughtTime: string | undefined;
	let loaded = false;

	function padToTwo(x: number) {
		if (x < 10) {
			return `0${x}`;
		}
		return x;
	}
	function updateCaughtTime() {
		if (!team) {
			return;
		}
		if (canTt4TeamBeCaught(team.catchTimes)) {
			caughtTime = undefined;
		} else {
			if (caughtTime === undefined && loaded) {
				navigator.vibrate([500, 250, 500, 250, 1000]);
			}
			const delta = remainingSafeTimeTt4(team.catchTimes);
			const min = Math.floor(delta / 1000 / 60);
			const sec = Math.floor((delta - min * 60 * 1000) / 1000);
			caughtTime = `${padToTwo(min)}:${padToTwo(sec)}`;
		}
	}

	let clear: ReturnType<typeof setInterval> | undefined;
	$: {
		clearInterval(clear);
		clear = setInterval(updateCaughtTime, 1000);
	}
	onMount(updateCaughtTime);

	function previewText(x: string): string {
		return x.replace(/<[^>]*>?/gm, '');
	}
</script>

<svelte:head>
	<title>Transit Trek: Team {team?.teamNum} Dashboard</title>
	<meta name="description" content="Seattle Transit Trek's August 2024 event, Hide and Seek 2" />
</svelte:head>

{#if team && gameState}
	<h1><em>{team.name || 'Untitled Team'}</em><br />Team {team.teamNum} Dashboard</h1>

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
		<p style="margin-bottom: -1em;">
			Your team has been caught {team.catchTimes.length} time{team.catchTimes.length === 1
				? '.'
				: 's.'}
		</p>
		{#if gameState?.t === 'pre' && gameState.countdown}
			<p>Standby. Game will start soon.</p>
		{:else if gameState?.t === 'pre'}
			<p>Game has not started yet.</p>
		{:else if gameState?.t === 'post'}
			<p>Game has concluded.</p>
		{:else if gameState?.t === 'ongoing' && gameState.catchEnabled}
			<p>🏃‍♂️ Chasers are active.</p>
		{:else if gameState?.t === 'ongoing' && !gameState.catchEnabled}
			<p>🛑 Chasers are <strong>not</strong> active.</p>
		{/if}
	</div>

	{#if caughtTime !== undefined}
		<div class="card caught" id="caughtCard">
			<h2>Caught!</h2>
			<p class="timeString">{caughtTime}</p>
			<p>
				For 10 minutes after you are caught, one team member must hop around with one foot for 10
				minutes, as if they had a cast on. They may alternate feet every 30 seconds. They may be
				(and probably should be) assisted by at least one, if not two, other team members.
			</p>
		</div>
	{/if}

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
				<p>
					Each team is required to take a 10 minute food/bio break sometime between the beginning of
					the 2nd hour and end of the 3rd hour. You are encouraged to do so only when you are safely
					far away from the chasers or in a safe zone.
				</p>
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

		{#each iterateTt4Categories(sortedChallenges) as category}
			<div class={`card challenges ${category}`}>
				<h3>{tt4ChallengeCategoryNames[category]}</h3>
			</div>

			<ul class={`challengeList ${category}`}>
				{#each sortedChallenges[category] as challenge}
					<li>
						<button on:click={() => openCallback(challenge)}>
							<span class="icon">
								{#if isTt4ChallengeComplete(challenge, team.challengeProgress)}
									<span style="transform: translateY(-5px)scale(0.8);">✅</span>
								{:else if category === 'selfie'}
									<span style="transform: translateY(-12px)">📷</span>
								{:else if category === 'experience'}
									<span style="transform: translateY(-5px)">🎫</span>
								{:else if category === 'distraction'}
									<span style="transform: translateY(-5px)">🔮</span>
								{/if}
							</span>
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

		<div class="card">
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

		<div class="card">
			<h2>Safe Zones</h2>
			<p style="font-weight: bold;">50 feet within the public bathrooms at Pike Place Market</p>
			<p>
				We strongly recommend you take your bio break here. The chasers will not be waiting for you
				to leave here, and you can safely take a break here without fearing being chased.
			</p>
			<p style="font-weight: bold;">Mean Sandwich</p>
			<p>
				This is a really awesome sandwich shop in Ballard. While it might take longer than 10
				minutes to get a sandwich prepared here, you can feel free to come here to support a
				business run by an ex-Microsoft employee who’s super cool! Their sandwiches are super good,
				btw. Support your local businesses! &lt;3
			</p>
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
		color: white;
		margin-top: 0;
		padding: 50px 20px;
		box-sizing: border-box;
		width: 100%;
		font-size: 40px;
		text-shadow:
			0 0 20px purple,
			0 10px 20px purple,
			0 -10px 20px purple;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background: radial-gradient(farthest-corner at 0 0, #150f37, black);
		background-attachment: fixed;
	}

	.card {
		background: rgba(0, 0, 0, 0.5);
		color: white;
		backdrop-filter: blur(10px);
		border-top: 2px rgba(255, 150, 255, 0.5) solid;
		box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.2);

		max-width: 500px;
		width: calc(100% - 50px);
		margin: 20px auto;
		padding: 20px 10px;
		box-sizing: border-box;
		overflow-x: hidden;
	}

	.card h2 {
		margin: 5px 0 10px 0;
	}

	.card.caught {
		border-top: 2px red solid;
		border-bottom: 2px red solid;
		box-shadow: 0 0 15px 5px rgba(255, 0, 0, 0.5);
	}

	.card.challenges {
		padding: 0 0 0 20px;
		border-top: none;
		border-left: 2px var(--color) solid;
		margin-left: max(calc(50vw - 250px), 25px);
		background: linear-gradient(to right, black, rgba(0, 0, 0, 0));
	}

	.card.challenges h3 {
		font-weight: normal;
	}

	.card.challenges.selfie {
		--color: rgba(241, 196, 15, 1);
	}

	.card.challenges.experience {
		--color: rgba(39, 174, 96, 1);
	}

	.card.challenges.distraction {
		--color: rgba(41, 128, 185, 1);
	}

	.challengeList {
		margin: 0;
		padding: 0;
		list-style: none;

		max-width: 500px;
		width: calc(100% - 50px);
		margin: 20px auto;
	}

	.challengeList li {
		margin-bottom: 10px;
	}

	.challengeList button {
		border: none;
		color: white;
		width: 100%;
		padding: 20px 30px;
		background: radial-gradient(
			farthest-corner at 0 0,
			rgba(var(--color), 0.2),
			rgba(0, 0, 0, 0.7) 65%
		);
		cursor: pointer;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		box-shadow: 0 0 10px 0 rgba(var(--color), 0.25);
	}

	.challengeList .icon {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40px;
		margin-right: 20px;
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
		font-weight: normal;

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

	.challengeList.selfie {
		--color: 241, 196, 15;
	}

	.challengeList.experience {
		--color: 39, 174, 96;
	}

	.challengeList.distraction {
		--color: 41, 128, 185;
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
