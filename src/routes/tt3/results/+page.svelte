<script lang="ts">
	import type { PublicChallengeDefinition } from '../../../types/challenge';
	import ChallengeView from '../../../components/challengeView.svelte';
	import type { ChallengeProgress, Team } from '../../../types/team';
	import challengesRaw from '../challenges.json';
	import results from '../results.json';
	import teamsRaw from '../teams.json';
	import Map from '../../../components/map/map.svelte';
	import { isChallengeComplete } from '../../../utils/challenge';
	import type { LogEntry } from '../../../types/logs';
	import { browser } from '$app/environment';
	import Error from '../../+error.svelte';

	const startTime = 1717880516094;

	const teams: Team[] = teamsRaw as unknown as Team[];
	const challenges: PublicChallengeDefinition[] = challengesRaw as PublicChallengeDefinition[];
	const logs: LogEntry[] = results as LogEntry[];

	const challengeMap: Record<string, PublicChallengeDefinition> = challenges.reduce(
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

	const overallChallengeProgress: ChallengeProgress = {
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
	function computeTeamTime(team: Team): string {
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

	let selectedChallenge: null | PublicChallengeDefinition = null;
	const openCallback = (c: PublicChallengeDefinition) => {
		if (selectedChallenge === null) {
			selectedChallenge = c;
		}
	};

	function timeToString(time: number): string {
		const date = new Date(time);
		return date.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' }).split(' ')[0];
	}

	function getEntriesForTeam(team: Team) {
		const teamId = team.id;
		const relevantLogs = logs
			.filter((x) => x.t === 'entry' || x.t === 'finish')
			.filter((x) => x.teamId === teamId);

		const r: { time: number; text: string }[] = [];

		const completedChallenges = new Set<string>();
		const currentProgress: ChallengeProgress = {};

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

				const newVal: ChallengeProgress[string] = {
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

					const dependencyChain = newlyCompletedChallenges.filter((x) => x.type !== 'subtask');
					if (dependencyChain.length !== 1) {
						// eslint-disable-next-line no-console
						console.error(newlyCompletedChallenges);
						// @ts-expect-error idk why errors don't work
						throw new Error('Failed to build chain');
					}
					let current = dependencyChain[0];
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

<h1>Results</h1>

<section class="podium">
	<h2>Podium</h2>

	{#each teams as team, i}
		<span class="rank">{i + 1}</span>
		<h3>Team {team.teamNum}: {team.name}</h3>
		<p>Final Time: <code>{computeTeamTime(team)}</code></p>
		{#if team.timePenaltyMin > 0}
			<p>Includes +{team.timePenaltyMin} minute penalty</p>
		{:else if team.timePenaltyMin < 0}
			<p>Includes {team.timePenaltyMin} minute handicap</p>
		{/if}
	{/each}
</section>

<section class="map">
	<h2>Map Distribution</h2>
	<ul>
		<li>
			<label
				><input type="radio" name="teamInfo" value={-1} bind:group={selectedTeam} />Overview</label
			>
		</li>
		{#each teams as team, i}
			<li>
				<label
					><input type="radio" name="teamInfo" value={i} bind:group={selectedTeam} />{i + 1}: Team {team.teamNum}
					{team.name}</label
				>
			</li>
		{/each}
	</ul>
	<div style="position:relative;">
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
		<div class="mapPercent" style="top: 65px; left: 190px;">{getTeamsCompletedMapPos(1.5, -1)}</div>
		<div class="mapPercent" style="top: 250px; left: 15px;">{getTeamsCompletedMapPos(5, 1)}</div>
		<div class="mapPercent" style="top: 250px; left: 175px;">{getTeamsCompletedMapPos(3)}</div>
		<div class="mapPercent" style="top: 645px; left: 15px;">{getTeamsCompletedMapPos(7)}</div>
		<div class="mapPercent" style="top: 645px; left: 190px;">{getTeamsCompletedMapPos(6)}</div>
	</div>
	<div>
		{#if selectedTeam === -1}
			<p>Select a team to see their specific route.</p>
		{:else}
			{#if teams[selectedTeam].teamNum in teamSpecificComments}
				<p>{teamSpecificComments[teams[selectedTeam].teamNum]}</p>
			{/if}
			<p class="timestamp"><span>{timeToString(startTime)}</span> ✅ Game Started</p>
			{#each getEntriesForTeam(teams[selectedTeam]) as entry}
				<p class="timestamp"><span>{timeToString(entry.time)}</span> {entry.text}</p>
			{/each}
		{/if}
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
					{Math.round((numCompleteEachChallenge[challengeId.cid] * 100) / teams.length)}%</td
				>
			</tr>
		{/each}
	</table>
	<h3>Team Breakdown</h3>
	<table>
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
	.podium .rank {
		display: block;
		font-size: 200%;
		font-weight: 900;
	}

	.map .mapPercent {
		position: absolute;
		font-weight: bold;
		font-size: 18px;
		opacity: 0.7;
	}

	.timestamp span {
		font-size: 26px;
	}

	.challengeStats td {
		position: relative;
	}

	.challengeStats .percentBar {
		position: absolute;
		z-index: -1;
		height: 100%;
		background: green;
	}
</style>
