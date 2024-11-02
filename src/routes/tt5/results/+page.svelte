<script lang="ts">
	import BigBtn from '../../../components/bigBtn.svelte';
	import TopLogo from '../../../components/topLogo.svelte';
	import ChallengeView from '../../../components/tt5/tt5ChallengeView.svelte';

	import teamsRaw from './teams.json';
	import challengesRaw from './challenges.json';
	import type { TT5ChallengeProgress, TT5Team } from '../../../types/tt5/team';
	import {
		iterateTt5Categories,
		tt5ChallengeCategoryNames,
		type TT5ChallengeCategory,
		type TT5PublicChallengeDefinition,
	} from '../../../types/tt5/challenge';
	import { isTt5ChallengeComplete } from '../../../utils/tt5/challenge';
	import Tt5ShrinkingTitle from '../../../components/tt5/tt5ShrinkingTitle.svelte';

	const teams: TT5Team[] = teamsRaw as unknown as TT5Team[];
	const teamsUnsorted = [...teams].sort((a, b) => a.teamNum - b.teamNum);
	$: teams.sort((a, b) => b.score - a.score);

	const challenges = challengesRaw as unknown as Record<
		TT5ChallengeCategory,
		TT5PublicChallengeDefinition[]
	>;
	const rawChallengesList = [...challenges.challenge, ...challenges.find];

	const challengeMap: Record<string, TT5PublicChallengeDefinition> = rawChallengesList.reduce(
		(a, x) => ({ ...a, [x.id]: x }),
		{},
	);

	const teamsCompletedChallenges: Record<string, Set<string>> = teams.reduce(
		(a, x) => ({
			...a,
			[x.id]: new Set(
				rawChallengesList
					.filter((c) => isTt5ChallengeComplete(c, x.challengeProgress))
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

	const overallChallengeProgress: TT5ChallengeProgress = {
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

	let selectedChallenge: null | TT5PublicChallengeDefinition = null;

	const openCallback = (c: TT5PublicChallengeDefinition) => {
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
	<title>Emerald City Expedition Results</title>
	<meta
		name="description"
		content="Final standings from Seattle Transit Trek's September 2024 event, The Emerald City Expedition"
	/>
</svelte:head>

<div id="outerWrap">
	<TopLogo />

	<h1 class="hero">Results</h1>

	<section class="info podium">
		<h2>Podium</h2>

		{#each teams as team, i}
			<div class={`place${i + 1}`}>
				<span class="rank">{i + 1}</span>
				<h3>Team {team.teamNum}: {team.name}</h3>
				<p>
					Total Score: <code>{team.score}</code>
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
						{#if challengeMap[challengeId.cid].shrinkTitle}
							<Tt5ShrinkingTitle text={challengeMap[challengeId.cid].title} />
						{:else}
							{challengeMap[challengeId.cid].title}
						{/if}
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
							Team {team.teamNum}:
							{team.name}
							<span style="font-size: 0.7em">({team.score} pt{team.score === 1 ? '' : 's'})</span>
						</label>
					</li>
				{/each}
			</ul>
			<select bind:value={selectedTeam}>
				<option value={-1}>Overview</option>
				{#each teams as team}
					<option value={team.teamNum}>
						Team {team.teamNum}:
						{team.name} ({team.score} pt{team.score === 1 ? '' : 's'})
					</option>
				{/each}
			</select>
		</div>
		<div>
			{#each iterateTt5Categories(challenges) as category}
				<div class={`card challenges ${category}`}>
					<h3>{tt5ChallengeCategoryNames[category]}</h3>
				</div>

				<ul class={`challengeList ${category}`}>
					{#each challenges[category] as challenge}
						<li>
							<button on:click={() => openCallback(challenge)}>
								<span class="icon">
									{#if isTt5ChallengeComplete(challenge, teamProgress)}
										<span style="transform: translateY(-5px)scale(0.8);">✅</span>
									{:else if category === 'find'}
										<span style="transform: translateY(-12px)">📷</span>
									{:else if category === 'challenge'}
										<span style="transform: translateY(-5px)">🎫</span>
									{/if}
								</span>
								<div class="wrap">
									{#if challenge.shrinkTitle}
										<h4 style="margin-bottom: 2em;">
											<Tt5ShrinkingTitle text={challenge.title} />
										</h4>
									{:else}
										<h4>{challenge.title}</h4>
									{/if}
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
						<td
							><span style="font-size: 1.5em;">{team.teamNum}</span><br /><span
								style="font-size: 0.8em;">{team.name}</span
							></td
						>
					{/each}
				</tr>
				{#each challengeIdArray as challengeId}
					<tr>
						<td>
							{#if challengeMap[challengeId].shrinkTitle}
								{challengeMap[challengeId].title.split('.')[0]}
							{:else}
								{challengeMap[challengeId].title}
							{/if}
						</td>
						{#each teamsUnsorted as team}
							<td>{teamsCompletedChallenges[team.id].has(challengeId) ? '✅' : ''}</td>
						{/each}
					</tr>
				{/each}
			</table>
		</div>
	</section>

	<section class="info midtext signupWrap lower">
		<strong>Thanks For Playing!</strong>
		<BigBtn isBlack={true} href="/tt5/" text="Back" color={['rgb(255,0,0)', 'rgb(128,0,0)']} />
	</section>
</div>

{#if selectedChallenge !== null}
	<ChallengeView
		challenge={selectedChallenge}
		challengeProgress={teamProgress}
		closeCallback={() => {
			selectedChallenge = null;
		}}
		isFloat={true}
	/>
{/if}

<style>
	:global(body) {
		padding: 0;
		margin: 0;
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

		background-image: url($lib/images/tt5/bg_repeat.jpg);
		background-size: 100% auto;
		background-repeat: repeat-y;
	}

	.hero {
		color: white;
		font-size: min(150px, 20vw);
		text-align: center;
		margin-top: 250px;
		text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
		-webkit-text-stroke: 5px black;
		paint-order: stroke fill;
	}

	.midtext {
		text-align: center;
		color: white;
		font-size: 20px;
		position: relative;
		z-index: 2;
		max-width: 1000px;
		margin: 0 auto;
	}

	.signupWrap {
		font-size: 30px;
		display: flex !important;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.signupWrap.lower {
		margin: 200px auto 250px auto;
	}

	.signupWrap strong {
		margin-right: 50px;
	}

	section.info {
		color: black;

		background: rgb(255, 255, 128);
		max-width: 1000px;
		display: block;
		margin: 70px auto;
		padding: 2.5em 4em;
		box-sizing: border-box;

		z-index: 3;
		position: relative;

		backdrop-filter: blur(10px);
		box-shadow: -2px 2px 10px black;
	}

	section.info::before {
		content: '';
		position: absolute;
		width: 50px;
		height: 50px;
		top: 5px;
		left: 45%;
		z-index: 1;
		background-image: url($lib/images/tt5/pin.png);
		background-size: contain;
		background-repeat: no-repeat;
		pointer-events: none;
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
		.signupWrap {
			flex-direction: column;
		}

		.signupWrap strong {
			margin-right: 0;
			margin-bottom: 30px;
		}

		section.info {
			padding-left: 10vw;
			padding-right: 10vw;
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
	.podium .place14 .rank {
		left: 0;
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
		background: rgba(255, 255, 255, 0.05);
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

	.card.challenges {
		padding: 0 0 0 20px;
		border-top: none;
		border-left: 2px var(--color) solid;
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

	.card {
		background: rgba(0, 0, 0, 0.5);
		color: white;
		backdrop-filter: blur(10px);
		border-top: 2px rgba(255, 150, 255, 0.5) solid;
		box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.2);

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
		border-left: 10px var(--color) solid;
		background: white;
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
		color: black;
		width: 100%;
		padding: 20px 30px;
		background: linear-gradient(to bottom right, rgba(var(--color), 0.2), rgba(var(--color), 0) 50%),
			white;
		border-left: 5px rgb(var(--color)) solid;
		cursor: pointer;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		box-shadow: -5px 5px 5px 0 rgba(0, 0, 0, 0.2);
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

	.challengeList.challenge {
		--color: 39, 174, 96;
	}

	.challengeList.find {
		--color: 41, 128, 185;
	}
</style>
