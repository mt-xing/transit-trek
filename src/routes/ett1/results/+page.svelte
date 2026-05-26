<script lang="ts">
	import BigBtn from '../../../components/bigBtn.svelte';
	import TopLogo from '../../../components/topLogo.svelte';
	import ChallengeView from '../../../components/ett1/ett1ChallengeView.svelte';

	import teamsRaw from './teams.json';
	import challengesRaw from './challenges.json';
	import type { ETT1ChallengeProgress, ETT1Team } from '../../../types/ett1/team';
	import {
		iterateEtt1Categories,
		ett1ChallengeCategoryNames,
		type ETT1ChallengeCategory,
		type ETT1PublicChallengeDefinition,
	} from '../../../types/ett1/challenge';
	import { isEtt1ChallengeComplete } from '../../../utils/ett1/challenge';
	import { getColor } from '../../../utils/ett1/colors';

	const teams: ETT1Team[] = teamsRaw as unknown as ETT1Team[];
	const teamsUnsorted = [...teams].sort((a, b) => a.teamNum - b.teamNum);
	$: teams.sort((a, b) => b.score - a.score);

	const challenges = challengesRaw as unknown as Record<
		ETT1ChallengeCategory,
		ETT1PublicChallengeDefinition[]
	>;
	const rawChallengesList = [...challenges.challenge, ...challenges.find, ...challenges.hard];

	const challengeMap: Record<string, ETT1PublicChallengeDefinition> = rawChallengesList.reduce(
		(a, x) => ({ ...a, [x.id]: x }),
		{},
	);

	const teamsCompletedChallenges: Record<string, Set<string>> = teams.reduce(
		(a, x) => ({
			...a,
			[x.id]: new Set(
				rawChallengesList
					.filter((c) => isEtt1ChallengeComplete(c, x.challengeProgress))
					.map((c) => c.id),
			),
		}),
		{},
	);

	const numCompleteEachChallenge: Record<string, number> = rawChallengesList.reduce(
		(a, c) => ({
			...a,
			[c.id]: teams.filter((team) => teamsCompletedChallenges[team.id].has(c.id)).length,
		}),
		{},
	);
	const challengeIdArray = rawChallengesList.map((x) => x.id);

	const overallChallengeProgress: ETT1ChallengeProgress = {
		...rawChallengesList.reduce(
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
	};

	function previewText(x: string): string {
		return x.replace(/<[^>]*>?/gm, '');
	}

	let selectedChallenge: null | ETT1PublicChallengeDefinition = null;

	const openCallback = (c: ETT1PublicChallengeDefinition) => {
		if (selectedChallenge === null) {
			selectedChallenge = c;
		}
	};

	let selectedTeam: number = -1;

	$: teamProgress =
		selectedTeam === -1
			? overallChallengeProgress
			: teamsUnsorted[selectedTeam - 1].challengeProgress;
</script>

<svelte:head>
	<title>Eastside Transit Trek Expedition Results</title>
	<meta
		name="description"
		content="Final standings from Seattle Transit Trek's April 2025 event, The Eastside Transit Trek"
	/>
</svelte:head>

<div id="outerWrap">
	<div id="headerBg"></div>
	<TopLogo
		customStyles="text-shadow: none; opacity: 1; font-family: Noto Sans, Helvetica, sans-serif; top: 2vh; color: white;"
		customImgStyles="box-shadow: none;"
	/>

	<h1 class="hero">Results</h1>

	<section class="info podium">
		<h2>Podium</h2>

		{#each teams as team, i}
			<div class={`place${i + 1}`}>
				<span class="rank">{i + 1}</span>
				<h3>
					<span class="colorBadge" style="--color: {getColor(team.teamNum)};"></span> Team {team.teamNum}:
					{team.name}
				</h3>
				<p>
					Total Score: <code>{Math.floor(team.score)}</code>
				</p>
			</div>
		{/each}
	</section>

	<section class="info challengePopularity">
		<h2>Challenge Popularity</h2>
		<table>
			<tr><th>Challenge</th><th>Completion</th></tr>
			{#each challengeIdArray
				.map((cid) => ({ cid, num: numCompleteEachChallenge[cid] }))
				.sort((a, b) => b.num - a.num) as challengeId}
				<tr>
					<td style="max-width: 100px">
						{challengeMap[challengeId.cid].title}
					</td>
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
	</section>

	<section class="info challengeWrap">
		<div>
			<h2>Progress</h2>
			<ul>
				<li class={selectedTeam === -1 ? 'selected' : ''}>
					<label
						><input
							type="radio"
							name="teamSelect"
							value={-1}
							bind:group={selectedTeam}
						/>Overview</label
					>
				</li>
				{#each teams as team}
					<li class={selectedTeam === team.teamNum ? 'selected' : ''}>
						<label>
							<input
								type="radio"
								name="teamSelect"
								value={team.teamNum}
								bind:group={selectedTeam}
							/>
							<span class="colorBadge" style="--color: {getColor(team.teamNum)};"></span> Team {team.teamNum}:
							Team {team.teamNum}:
							{team.name}
							<span style="font-size: 0.7em"
								>({Math.floor(team.score)} pt{team.score === 1 ? '' : 's'})</span
							>
						</label>
					</li>
				{/each}
			</ul>
			<select bind:value={selectedTeam}>
				<option value={-1}>Overview</option>
				{#each teams as team}
					<option value={team.teamNum}>
						Team {team.teamNum}:
						{team.name} ({Math.floor(team.score)} pt{team.score === 1 ? '' : 's'})
					</option>
				{/each}
			</select>
		</div>
		<div>
			{#each iterateEtt1Categories(challenges) as category}
				<div class={`card challenges ${category}`}>
					<h3>{ett1ChallengeCategoryNames[category]}</h3>
				</div>

				<ul class={`challengeList ${category}`}>
					{#each challenges[category] as challenge}
						<li>
							<button on:click={() => openCallback(challenge)}>
								{#if isEtt1ChallengeComplete(challenge, teamProgress)}
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
			{/each}
		</div>
	</section>

	<section class="info">
		<h2>Team Breakdown</h2>
		<div class="teamBreakdownWrap">
			<table class="teamBreakdown">
				<tr>
					<th>Challenge</th>
					{#each teamsUnsorted as team}
						<td>
							<span style="font-size: 1.5em;white-space:nowrap;"
								><span class="colorBadge" style="--color: {getColor(team.teamNum)};"></span>
								{team.teamNum}</span
							>
							<br />
							<span style="font-size: 0.8em;">{team.name}</span>
						</td>
					{/each}
				</tr>
				{#each challengeIdArray as challengeId}
					<tr>
						<td>
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

	<div class="signupWrap">
		<p>Thanks For Playing!</p>
		<p>
			<BigBtn
				isBlack={true}
				href="/ett1/"
				text="Back"
				external={true}
				color={['rgb(128,255,255)', 'rgb(200,255,255)']}
				customStyles="text-shadow: none; -webkit-text-stroke: unset; box-shadow: none; color: black; font-family: ClearSansBold, Arial, sans-serif; font-size: 30px;"
			/>
		</p>
	</div>
</div>

{#if selectedChallenge !== null}
	<ChallengeView
		challenge={selectedChallenge}
		challengeProgress={teamProgress}
		closeCallback={() => {
			selectedChallenge = null;
		}}
		isFloat={true}
		score={selectedTeam >= 0 ? teamsUnsorted[selectedTeam - 1].score : 0}
	/>
{/if}

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	#headerBg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: min(calc(100px + 4vh), calc(10vw + 4vh));
		background: #f24e69;
		z-index: 5;
	}

	#outerWrap {
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		overflow-x: clip;
		overflow-y: clip;
		display: flow-root;
		position: relative;
		background: white;
	}

	.hero {
		color: black;
		font-size: min(150px, 20vw);
		text-align: center;
		margin-top: calc(250px + 5vw);
		position: relative;
	}

	.hero::after {
		content: '';
		height: 2vw;
		width: 100%;
		position: absolute;
		background: #00a0df;
		left: 0;
		top: calc(-4vw);
	}

	.hero::before {
		content: '';
		position: absolute;
		left: 50%;
		top: -3vw;
		transform: translate(-50%, -50%);
		width: 4vw;
		height: 4vw;
		border-radius: 4vw;
		border: 0.8vw black solid;
		background: white;
		z-index: 4;
	}

	.midtext {
		text-align: center;
		color: black;
		font-size: 20px;
		position: relative;
		z-index: 2;
		max-width: 1000px;
		margin: 0 auto;
	}

	.signupWrap {
		font-size: 30px;
		display: block;
		width: 100%;
		position: relative;
		text-align: center;
	}

	.signupWrap::after {
		content: '';
		height: 2.1vw;
		width: 100%;
		position: absolute;
		background: #00a0df;
		left: 0;
		top: calc(40px + 4vw);
	}

	.signupWrap p {
		position: relative;
	}

	.signupWrap p:first-child {
		margin-right: 20vw;
		margin-bottom: 0;
		padding-bottom: 4vw;
	}

	.signupWrap p:last-child {
		margin-left: 20vw;
		margin-top: 2vw;
		padding-top: 4vw;
	}

	.signupWrap p::after {
		content: '';
		width: 2.1vw;
		height: 3vw;
		position: absolute;
		background: #00a0df;

		left: 50%;
		transform: translateX(-50%);
	}

	.signupWrap p:first-child::after {
		bottom: 0;
	}

	.signupWrap p:last-child::after {
		top: 0;
		z-index: 2;
		transition: opacity 0.2s ease-in-out;
	}

	section.info {
		color: black;

		background: rgb(240, 240, 240);
		border-bottom: 5px black solid;

		max-width: 1000px;
		display: block;
		margin: 70px auto;
		padding: 2.5em 4em;
		box-sizing: border-box;

		z-index: 3;
		position: relative;
	}

	section.info h2 {
		margin: 0.5em 0 1em 0;
		font-size: 40px;
	}

	@media (max-width: 1100px) {
		section.info,
		.midtext {
			margin-left: auto;
			margin-right: auto;
		}
	}

	@media (max-width: 600px) {
		section.info {
			padding-left: 10vw;
			padding-right: 10vw;
		}
	}

	@media (max-width: 500px) {
		.signupWrap::after {
			top: 0;
		}

		.signupWrap::before {
			content: '';
			position: absolute;

			width: 4vw;
			height: 4vw;
			border-radius: 4vw;
			border: 0.8vw black solid;
			z-index: 4;
			background: white;
			top: calc(-2.8vw + 1.05vw);
			left: 50%;
			transform: translateX(-50%);
		}

		.signupWrap p:first-child {
			margin: 0;
			padding-top: 7vw;
			z-index: 2;
		}

		.signupWrap p:last-child {
			margin: -5vw 0 0 0;
			padding-top: 0;
			z-index: 1;
		}

		.signupWrap p::after {
			display: none;
		}
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
		color: black;
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
		color: black;
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
		color: black;
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

	.podium .place10 .rank,
	.podium .place11 .rank,
	.podium .place12 .rank,
	.podium .place13 .rank,
	.podium .place14 .rank,
	.podium .place15 .rank,
	.podium .place16 .rank {
		left: 0;
	}

	.colorBadge {
		display: inline-block;
		height: 1em;
		width: 1em;
		background: var(--color);
		transform: translateY(3px);
		border: 1px black solid;
	}

	.podium code {
		font-size: 20px;
	}

	.challengePopularity table {
		border-collapse: collapse;
	}

	.challengePopularity td,
	.challengePopularity tr {
		padding: 5px 15px;
	}

	.challengePopularity table tr:nth-child(even) {
		background: rgba(0, 0, 0, 0.05);
	}

	.challengePopularity td {
		position: relative;
	}

	.challengePopularity .percentBar {
		position: absolute;
		z-index: 0;
		height: calc(100% - 2px);
		background: linear-gradient(to right, white, #0596cf 100%);
		left: 0;
		top: 1px;
		box-sizing: border-box;
	}

	.challengePopularity .percentText {
		z-index: 1;
		font-weight: bold;
		position: relative;
	}

	.challengePopularity table {
		width: 100%;
	}

	.challengePopularity th {
		padding: 1em;
		text-align: left;
	}

	table.teamBreakdown {
		width: 100%;
		table-layout: fixed;
		border-collapse: collapse;
	}

	.teamBreakdown td,
	.teamBreakdown tr {
		padding: 5px 15px;
	}

	.teamBreakdown tr:nth-child(even) {
		background: rgba(0, 0, 0, 0.05);
	}

	.teamBreakdown tr:first-child td {
		vertical-align: top;
	}

	.teamBreakdownWrap {
		width: 100%;
		overflow-x: auto;
	}

	table.teamBreakdown {
		width: 1500px;
	}

	@media (max-width: 1100px) {
		section.info {
			width: 90%;
		}
	}

	@media (max-width: 800px) {
		section.info {
			width: 95%;
		}

		.podium > div {
			height: 9em;
		}
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

	.card.challenges.hard {
		--color: #8a2631;
		margin-bottom: 0;
	}

	.card {
		color: black;

		width: 100%;
		margin: 20px auto;
		padding: 20px 10px;
		box-sizing: border-box;
		overflow-x: hidden;
	}
	.challengeList {
		margin: 0;
		padding: 0;
		list-style: none;

		width: 100%;
		margin: 20px auto;
	}

	.challengeList li {
		margin-bottom: 10px;
	}

	.challengeList button {
		border: none;
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

	.challengeWrap > div {
		display: inline-block;
	}

	.challengeWrap > div:first-child {
		width: 350px;
		position: sticky;
		top: 0;
		vertical-align: top;
		box-sizing: border-box;
	}

	.challengeWrap > div:first-child ul {
		list-style: none;
		padding: 0;
	}

	.challengeWrap > div:first-child li {
		margin-bottom: 5px;
	}

	.challengeWrap > div:first-child label {
		cursor: pointer;
	}

	.challengeWrap > div:last-child {
		width: calc(100% - 355px);
	}

	.challengeWrap select {
		padding: 1em 2em;
		display: none;
	}

	@media (max-width: 900px) {
		.challengeWrap > div {
			display: block;
			width: 100%;
		}

		.challengeWrap > div:first-child {
			position: relative;
		}

		.challengeWrap > div:first-child ul {
			display: none;
		}

		.challengeWrap select {
			display: initial;
			max-width: 100%;
		}

		.challengeWrap > div:last-child {
			width: 100%;
		}
	}

	.card.challenges {
		padding: 0 0 0 20px;
		color: black;
		border-top: none;
	}

	.card.challenges::before {
		display: none;
	}

	.card.challenges h3 {
		font-weight: normal;
	}

	.card.challenges.challenge {
		--color: rgba(39, 174, 96, 1);
	}

	.card.challenges.find {
		--color: rgba(41, 128, 185, 1);
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
		background: none;
		width: 100%;
		padding: 20px 30px 20px 40px;
		cursor: pointer;

		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
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

	.challengeList li:first-child button {
		padding-top: 40px;
	}

	.challengeList.find li:first-child button .station {
		top: 45px;
	}

	.challengeList li:first-child button .station {
		top: 30px;
	}

	.challengeList button::before {
		width: 10px;
		height: 100%;
		position: absolute;
		background: rgb(var(--color));
		content: '';
		top: 0;
		left: 0px;
	}

	.challengeList .station {
		width: 40px;
		height: 40px;
		border-radius: 40px;
		box-sizing: border-box;
		background: white;
		position: absolute;
		top: 10px;
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
		top: 25px;
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
</style>
