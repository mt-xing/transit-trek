<script lang="ts">
	import { onMount } from 'svelte';
	import type { TT3PublicChallengeDefinition } from '../../../types/tt3/challenge';
	import ChallengeView from '../../../components/tt3/tt3ChallengeView.svelte';
	import type { TT3ChallengeProgress, TT3Team } from '../../../types/tt3/team';
	import challengesRaw from '../challenges.json';
	import results from '../results.json';
	import teamsRaw from '../teams.json';
	import Map from '../../../components/tt3/map/map.svelte';
	import { isChallengeComplete } from '../../../utils/challenge';
	import type { TT3LogEntry } from '../../../types/tt3/logs';
	import { browser } from '$app/environment';
	import Error from '../../+error.svelte';

	let y: number;
	let innerHeight: number;

	let loaded = false;
	onMount(() => {
		loaded = true;
	});

	let parallaxY: number;
	$: parallaxY = loaded ? y / (document.documentElement.scrollHeight - innerHeight) : 0;

	const startTime = 1717880516094;

	const teams: TT3Team[] = teamsRaw as unknown as TT3Team[];
	const challenges: TT3PublicChallengeDefinition[] =
		challengesRaw as TT3PublicChallengeDefinition[];
	const logs: TT3LogEntry[] = results as TT3LogEntry[];

	const challengeMap: Record<string, TT3PublicChallengeDefinition> = challenges.reduce(
		(a, x) => ({ ...a, [x.id]: x }),
		{},
	);

	const gameState = { t: 'post' as const, startTime };

	const teamsCompletedChallenges: Record<string, Set<string>> = teams.reduce(
		(a, x) => ({
			...a,
			[x.id]: new Set(
				challenges
					.filter((c) =>
						isChallengeComplete(c, {
							allChallenges: challenges,
							challengeProgress: x.challengeProgress,
							gameState,
						}),
					)
					.map((c) => c.id),
			),
		}),
		{},
	);

	const numCompleteEachChallenge: Record<string, number> = challenges.reduce(
		(a, c) => ({
			...a,
			[c.id]: teams.filter((team) => teamsCompletedChallenges[team.id].has(c.id)).length,
		}),
		{},
	);
	const challengeIdArray = challenges.map((x) => x.id);

	function getTeamsCompletedMapPos(mapId: number, manualAdd?: number) {
		return `${Math.round(
			((challenges
				.filter((x) => x.mapPos === mapId)
				.map((c) => numCompleteEachChallenge[c.id])
				.reduce((a, x) => a + x, 0) +
				(manualAdd ?? 0)) *
				100) /
				teams.length,
		)}%`;
	}

	const overallChallengeProgress: TT3ChallengeProgress = {
		...challenges.reduce(
			(a, c) => ({
				...a,
				[c.id]: {
					progress:
						numCompleteEachChallenge[c.id] > teams.length / 2
							? Array.from(Array(99)).map((_) => true)
							: [false],
				},
			}),
			{},
		),
		// Manually adding in Seattle Grace Hospital
		'f3c68ff7-d49e-4e47-8903-d39cd17a29dd': { progress: [true, true] },
	};

	let selectedTeam: number = -1;
	$: {
		if (browser) {
			if (selectedTeam !== -1) {
				// eslint-disable-next-line no-restricted-syntax
				for (const el of document.getElementsByClassName('mapPercent')) {
					// @ts-expect-error Element has style
					el.style.opacity = 0;
				}
			} else {
				// eslint-disable-next-line no-restricted-syntax
				for (const el of document.getElementsByClassName('mapPercent')) {
					// @ts-expect-error Element has style
					el.style.opacity = '';
				}
			}
		}
	}

	const teamSpecificComments: Record<number, string> = {
		4: 'Arjun, who was the Lyric Challenge guy, was on this team. For this team, the Lyric Challenge required Arjun to correctly guess the song in 10 seconds.',
		5: "This team was the first to make it to UW and was the one that informed us that the bookstore's textbook section was closed. As compensation for the time they spent attempting that challenge, we credited it to them. No other team was allowed to attempt the bookstore challenge.",
		7: 'This team noticed that the pedestrian exclusions did not ban walking from Seattle Center to Capitol Hill, so they did so. This walk caused them to arrive at Capitol Hill later than another team who arrived at Seattle Center after them.',
		9: 'This is the only team that completed License Plate Hunter. In fact, they completed both challenges in the Northgate area. To the best of our knowledge, they took the Link.',
	};

	teams.sort(
		(a, b) =>
			(a.finishTime ?? 0) +
			a.timePenaltyMin * 60 * 1000 -
			((b.finishTime ?? 0) + b.timePenaltyMin * 60 * 1000),
	);
	const teamsUnsorted = teams.slice().sort((a, b) => a.teamNum - b.teamNum);

	function padToTwo(x: number) {
		if (x < 10) {
			return `0${x}`;
		}
		return x;
	}
	function computeTeamTime(team: TT3Team): string {
		if (!team.finishTime) {
			return '00:00:00';
		}
		const timeDeltaMs = team.finishTime + team.timePenaltyMin * 60 * 1000 - startTime;

		const hours = Math.floor(timeDeltaMs / 1000 / 60 / 60);
		const rawMins = timeDeltaMs - hours * 60 * 60 * 1000;
		const min = Math.floor(rawMins / 1000 / 60);
		const sec = Math.floor((rawMins - min * 60 * 1000) / 1000);
		return `${padToTwo(hours)}:${padToTwo(min)}:${padToTwo(sec)}`;
	}

	let selectedChallenge: null | TT3PublicChallengeDefinition = null;
	const openCallback = (c: TT3PublicChallengeDefinition) => {
		if (selectedChallenge === null) {
			selectedChallenge = c;
		}
	};

	function timeToString(time: number): string {
		const date = new Date(time);
		return date.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' }).split(' ')[0];
	}

	function getEntriesForTeam(team: TT3Team) {
		const teamId = team.id;
		const relevantLogs = logs
			.filter((x) => x.t === 'entry' || x.t === 'finish')
			.filter((x) => x.teamId === teamId);

		const r: { time: number; text: string }[] = [];

		const completedChallenges = new Set<string>();
		const currentProgress: TT3ChallengeProgress = {};

		// eslint-disable-next-line no-restricted-syntax
		for (const l of relevantLogs) {
			if (l.t !== 'entry') {
				if (l.t === 'finish' && l.finish) {
					r.push({ time: l.time, text: '🏁 Team Finished' });
				}
			} else {
				const { manualUnlock, manualComplete } = l.value;
				const time =
					// eslint-disable-next-line no-nested-ternary
					l.time < startTime
						? startTime + 1
						: l.time > team.finishTime!
							? team.finishTime! - 1
							: l.time;
				const challenge = challengeMap[l.challengeId];
				const max = challenge.type === 'multi' ? challenge.partDescs.length : 1;

				const progress =
					currentProgress[l.challengeId]?.progress ?? Array.from(Array(max)).fill(false);
				if (l.value.progress) {
					l.value.progress.forEach((x, i) => {
						progress[i] = x;
					});
				}

				const newVal: TT3ChallengeProgress[string] = {
					manualComplete: manualComplete as boolean | undefined,
					manualUnlock: manualUnlock as boolean | undefined,
					progress,
				};

				currentProgress[l.challengeId] = newVal;
				const newlyCompletedChallenges = challenges.filter(
					(c) =>
						!completedChallenges.has(c.id) &&
						isChallengeComplete(c, {
							allChallenges: challenges,
							challengeProgress: currentProgress,
							gameState,
						}),
				);
				if (newlyCompletedChallenges.length === 1) {
					completedChallenges.add(newlyCompletedChallenges[0].id);
					r.push({
						time,
						text: `Completed "${newlyCompletedChallenges[0].title}"`,
					});
				} else if (newlyCompletedChallenges.length > 1) {
					newlyCompletedChallenges.forEach((x) => completedChallenges.add(x.id));

					const dependencyChain: TT3PublicChallengeDefinition[] = newlyCompletedChallenges.filter(
						(x) => x.type !== 'subtask',
					);
					if (dependencyChain.length !== 1) {
						// eslint-disable-next-line no-console
						console.error(newlyCompletedChallenges);
						// @ts-expect-error idk why errors don't work
						throw new Error('Failed to build chain');
					}
					let current: TT3PublicChallengeDefinition = dependencyChain[0];
					let bail = 99;
					while (current) {
						const next = newlyCompletedChallenges.filter(
							// eslint-disable-next-line @typescript-eslint/no-loop-func
							(x) => x.type === 'subtask' && x.subtaskInfo.mapPos === current.mapPos,
						);
						if (next.length !== 1) {
							if (next.length === 0) {
								break;
							}
							// eslint-disable-next-line no-console
							console.error(newlyCompletedChallenges);
							// @ts-expect-error idk why errors don't work
							throw new Error('Failed to build chain');
						}
						[current] = next;
						dependencyChain.push(current);
						bail--;
						if (bail <= 0) {
							// eslint-disable-next-line no-console
							console.error(newlyCompletedChallenges);
							// @ts-expect-error idk why errors don't work
							throw new Error('Failed to build chain infinite loop');
						}
					}
					r.push({
						time,
						text: `Completed "${dependencyChain[0].title}" which also finished "${dependencyChain
							.slice(1)
							.map((x) => x.title)
							.join('" and "')}"`,
					});
				}
			}
		}

		r.sort((a, b) => a.time - b.time);
		return r;
	}
</script>

<svelte:head>
	<title>Race Across Seattle Results</title>
	<meta
		name="description"
		content="Final standings from Seattle Transit Trek's June 2024 event, Race Across Seattle"
	/>
</svelte:head>

<svelte:window bind:scrollY={y} bind:innerHeight />

<div id="bgImg" style="background-position: 50% {parallaxY * 100}%"></div>

<h1>Results</h1>

<section class="podium">
	<h2>Podium</h2>

	{#each teams as team, i}
		<div class={`place${i + 1}`}>
			<span class="rank">{i + 1}</span>
			<h3>Team {team.teamNum}: {team.name}</h3>
			<p>Final Time: <code>{computeTeamTime(team)}</code></p>
			{#if team.timePenaltyMin > 0}
				<p>Includes +{team.timePenaltyMin} minute penalty</p>
			{:else if team.timePenaltyMin < 0}
				<p>Includes {team.timePenaltyMin} minute handicap</p>
			{/if}
		</div>
	{/each}
</section>

<section class="map">
	<h2>Map</h2>
	<div class="mapInner">
		<ul>
			<li class={selectedTeam === -1 ? 'selected' : ''}>
				<label
					><input
						type="radio"
						name="teamInfo"
						value={-1}
						bind:group={selectedTeam}
					/>Overview</label
				>
			</li>
			{#each teams as team, i}
				<li class={selectedTeam === i ? 'selected' : ''}>
					<label>
						<input type="radio" name="teamInfo" value={i} bind:group={selectedTeam} />
						({i + 1}) Team {team.teamNum}:
						{team.name}
					</label>
				</li>
			{/each}
		</ul>
		<div style="position:relative;" class="mapWrap">
			<Map
				dashboardInfo={{
					challengeProgress:
						selectedTeam > -1 ? teams[selectedTeam].challengeProgress : overallChallengeProgress,
					allChallenges: challenges,
					gameState,
				}}
				{openCallback}
			/>
			<div class="mapPercent" style="top: 65px; left: 5px;">{getTeamsCompletedMapPos(1)}</div>
			<div class="mapPercent" style="top: 65px; left: 190px;">
				{getTeamsCompletedMapPos(1.5, -1)}
			</div>
			<div class="mapPercent" style="top: 250px; left: 15px;">{getTeamsCompletedMapPos(5, 1)}</div>
			<div class="mapPercent" style="top: 250px; left: 175px;">{getTeamsCompletedMapPos(3)}</div>
			<div class="mapPercent" style="top: 645px; left: 15px;">{getTeamsCompletedMapPos(7)}</div>
			<div class="mapPercent" style="top: 645px; left: 190px;">{getTeamsCompletedMapPos(6)}</div>
		</div>
		<div class="infoWrap">
			{#if selectedTeam === -1}
				<p>Select a team to see their specific route.</p>
			{:else}
				<h3>
					Team {teams[selectedTeam].teamNum}: {teams[selectedTeam].name}<br />(Rank {selectedTeam +
						1} of
					{teams.length})
				</h3>
				{#if teams[selectedTeam].teamNum in teamSpecificComments}
					<p>{teamSpecificComments[teams[selectedTeam].teamNum]}</p>
				{/if}
				<p class="timestamp"><span>{timeToString(startTime)}</span> ✅ Game Started</p>
				{#each getEntriesForTeam(teams[selectedTeam]) as entry}
					<p class="timestamp"><span>{timeToString(entry.time)}</span> {entry.text}</p>
				{/each}
			{/if}
		</div>
	</div>
</section>

<section class="challengeStats">
	<h2>Challenge Stats</h2>
	<h3>Challenge Popularity</h3>
	<table>
		<tr><th>Challenge</th><th>Completion</th></tr>
		{#each challengeIdArray
			.map((cid) => ({ cid, num: numCompleteEachChallenge[cid] }))
			.sort((a, b) => {
				if (a.num === b.num) {
					if (challengeMap[a.cid].mapPos === 99) {
						return -1;
					}
					if (challengeMap[b.cid].mapPos === 99) {
						return 1;
					}
					return challengeMap[a.cid].mapPos - challengeMap[b.cid].mapPos;
				}
				return b.num - a.num;
			}) as challengeId}
			<tr>
				<td>{challengeMap[challengeId.cid].title}</td>
				<td>
					<span
						class="percentBar"
						style={`width: ${(numCompleteEachChallenge[challengeId.cid] * 100) / teams.length}%;`}
					></span>
					<span class="percentText">
						{Math.round((numCompleteEachChallenge[challengeId.cid] * 100) / teams.length)}%
					</span>
				</td>
			</tr>
		{/each}
	</table>
	<h3>Team Breakdown</h3>
	<div class="teamBreakdownWrap">
		<table class="teamBreakdown">
			<tr>
				<th>Challenge</th>
				{#each teamsUnsorted as team}
					<td>Team {team.teamNum}<br />{team.name}</td>
				{/each}
			</tr>
			{#each challengeIdArray.sort((a, b) => {
				const aa = challengeMap[a];
				const bb = challengeMap[b];
				if (aa.mapPos !== bb.mapPos) {
					if (aa.mapPos === 99) {
						return -1;
					}
					if (bb.mapPos === 99) {
						return 1;
					}
					if (aa.title === 'Howl Like Huskies') {
						return 4.25 - bb.mapPos;
					}
					if (bb.title === 'Howl Like Huskies') {
						return aa.mapPos - 4.25;
					}
					return aa.mapPos - bb.mapPos;
				}
				if (aa.title === 'Howl Like Huskies') {
					return 4.25 - bb.mapPos;
				}
				if (bb.title === 'Howl Like Huskies') {
					return aa.mapPos - 4.25;
				}
				return aa.title.localeCompare(bb.title);
			}) as challengeId}
				<tr>
					<td>
						{(challengeMap[challengeId].mapPos * 10) % 10 === 1 ? '\xa0\xa0⤷ ' : ''}
						{(challengeMap[challengeId].mapPos * 10) % 10 === 2 ? '\xa0\xa0\xa0\xa0⤷ ' : ''}
						{(challengeMap[challengeId].mapPos * 10) % 10 === 3 ? '\xa0\xa0\xa0\xa0⤷ ' : ''}
						{challengeMap[challengeId].title}
					</td>
					{#each teamsUnsorted as team}
						<td>{teamsCompletedChallenges[team.id].has(challengeId) ? '✅' : ''}</td>
					{/each}
				</tr>
			{/each}
		</table>
	</div>
</section>

<section class="signupwrap">
	<h2>Thank You For Playing!</h2>
	<p style="text-align: center;"><a href="/tt3"><span style="position:relative;">Home</span></a></p>
</section>

{#if selectedChallenge !== null}
	<ChallengeView
		challenge={selectedChallenge}
		dashboardInfo={{
			challengeProgress:
				selectedTeam > -1 ? teams[selectedTeam].challengeProgress : overallChallengeProgress,
			allChallenges: challenges,
			gameState,
		}}
		closeCallback={() => {
			selectedChallenge = null;
		}}
	/>
{/if}

<style>
	h1 {
		color: white;
		font-weight: 900;
		font-size: 100px;
		text-align: center;

		text-shadow: black 0 0 1.5vw;
		-webkit-text-stroke: 5px black;
	}

	#bgImg {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		background-image: url($lib/images/transit-trek-bg-wide.png);
		background-size: cover;
		background-position: center;
	}

	section {
		background: #ecf0f1;
		width: 80%;
		margin: 20px auto;
		padding: 40px 50px;
		box-sizing: border-box;
		border-radius: 15px;
		box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.2);
		overflow-x: hidden;
	}

	section h2 {
		margin-top: 0;
		text-align: center;
		font-size: 40px;
	}

	.podium > div {
		position: relative;
		padding-left: 50px;
		height: 6em;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.podium > div.place1 {
		background: radial-gradient(
				ellipse farthest-corner at right bottom,
				#fedb37 0%,
				#fdb931 8%,
				#9f7928 30%,
				#8a6e2f 40%,
				transparent 80%
			),
			radial-gradient(
				ellipse farthest-corner at left top,
				#ffffff 0%,
				#ffffac 8%,
				#d1b464 25%,
				#5d4a1f 62.5%,
				#5d4a1f 100%
			);
	}

	.podium > div.place2 {
		background: radial-gradient(
				ellipse farthest-corner at left top,
				#a8a9ad 0%,
				#d7d7d8 40%,
				transparent 80%
			),
			radial-gradient(
				ellipse farthest-corner at right bottom,
				#d7d7d8 0%,
				#c0c0c3 50%,
				#a8a9ad 100%
			);
	}

	.podium > div.place3 {
		background: #cd7f32;
		background: linear-gradient(to bottom, #cd7f32 0%, #be7023 100%);
	}

	.podium > div > h3 {
		margin: 0;
	}

	.podium > div > p {
		margin: 5px 0 0 0;
	}

	.podium .rank {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 200%;
		font-weight: 900;
	}

	.podium code {
		font-size: 20px;
	}

	.map .mapInner {
		display: flex;
		flex-direction: row;
	}

	.map ul {
		list-style: none;
		padding: 0;
		width: 33%;
		box-sizing: border-box;
	}

	.map ul li label {
		display: inline-block;
		padding: 10px 5px;
	}

	.map ul li label,
	.map ul li input {
		cursor: pointer;
	}

	.map ul li.selected {
		font-weight: bold;
	}

	.map .mapWrap {
		margin: auto;
	}

	.map .infoWrap {
		width: 33%;
		margin-left: 30px;
		box-sizing: border-box;
	}

	.map .mapPercent {
		position: absolute;
		font-weight: bold;
		font-size: 18px;
		opacity: 0.7;
	}

	.map .timestamp span {
		font-size: 26px;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
	}

	.map .timestamp {
		position: relative;
		min-height: 40px;
		padding-left: 110px;
		display: flex;
		align-items: center;
	}

	.challengeStats table {
		border-collapse: collapse;
	}

	.challengeStats td,
	.challengeStats tr {
		padding: 5px 15px;
	}

	.challengeStats table tr:nth-child(even) {
		background: rgba(0, 0, 0, 0.075);
	}

	.challengeStats table.teamBreakdown {
		width: 100%;
		table-layout: fixed;
	}

	.challengeStats td {
		position: relative;
	}

	.challengeStats .percentBar {
		position: absolute;
		z-index: 0;
		height: 100%;
		background: linear-gradient(to right, #e6400e 0%, #9366b3 50%, #0596cf 100%);
		left: 0;
		top: 0;
	}

	.challengeStats .percentText {
		z-index: 1;
		font-weight: bold;
		text-shadow: 0 0 5px white;
		position: relative;
	}

	.signupwrap a {
		padding: 20px 60px;
		display: inline-block;
		color: black;
		text-decoration: none;
		position: relative;
		overflow: hidden;
		text-shadow: 0 0 15px white;
		-webkit-text-stroke: 2px white;
		paint-order: stroke fill;
		font-weight: bold;
		font-size: 25px;
		box-shadow: 0 0 1px 1px black;

		transition:
			box-shadow 0.5s ease-in-out,
			color 0.5s ease-in-out,
			text-shadow 0.5s ease-in-out,
			-webkit-text-stroke 0.5s ease-in-out;
	}

	.signupwrap a:hover,
	.signupwrap a:focus {
		box-shadow: 0 0 20px 0px black;
		color: white;
		text-shadow: 0 0 15px black;
		-webkit-text-stroke: 2px black;
	}

	.signupwrap a:active {
		transition: box-shadow 0.1s ease-in-out;
		box-shadow: 0 0 20px 0px white;
	}

	.signupwrap a::after {
		content: '➤';
		margin-left: 1em;
		display: inline-block;
		transform: translateX(0);
		transition: transform 0.25s ease-in-out;
	}

	.signupwrap a:hover::after,
	.signupwrap a:focus::after {
		transform: translateX(1em);
	}

	.signupwrap a::before {
		content: '';
		display: block;
		position: absolute;
		z-index: 0;
		background: linear-gradient(
			to right,
			#e6400e 0%,
			#9366b3 25%,
			#0596cf 50%,
			rgba(0, 0, 255, 0) 100%
		);
		top: 0;
		left: 0;
		width: 200%;
		height: 100%;
		transform: translateX(-100%);
		transition: transform 0.5s ease-in-out;
	}

	.signupwrap a:hover::before,
	.signupwrap a:focus::before {
		transform: translateX(0);
	}

	@media (max-width: 1650px) {
		.challengeStats .teamBreakdownWrap {
			width: 100%;
			overflow-x: auto;
		}

		.challengeStats table.teamBreakdown {
			width: 1300px;
		}
	}

	@media (max-width: 1200px) {
		section {
			width: 90%;
		}
	}

	@media (max-width: 800px) {
		section {
			width: 95%;
		}

		.map .mapInner {
			flex-direction: column;
		}

		.map .mapInner ul,
		.map .mapInner .infoWrap {
			width: 100%;
		}

		.map .mapInner .infoWrap {
			margin-left: 0;
		}

		.podium > div {
			height: 9em;
		}
	}
</style>
