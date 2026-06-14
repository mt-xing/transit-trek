<script lang="ts">
	import BigBtn from '../../../components/bigBtn.svelte';
	import TopLogo from '../../../components/topLogo.svelte';
	import ChallengeView from '../../../components/tt6/tt6ChallengeView.svelte';
	import bgImg from '$lib/images/tt6/bg.jpg';

	import teamsRaw from './teams.json';
	import challengesRaw from './challenges.json';
	import type { TT6ChallengeProgress, TT6Team } from '../../../types/tt6/team';
	import {
		iterateTt6Categories,
		tt6ChallengeCategoryNames,
		type TT6ChallengeCategory,
		type TT6PublicChallengeDefinition,
	} from '../../../types/tt6/challenge';
	import { isTt6ChallengeComplete } from '../../../utils/tt6/challenge';
	import Tt6Card from '../../../components/tt6/tt6Card.svelte';
	import Tt6ShrinkingTitle from '../../../components/tt6/tt6ShrinkingTitle.svelte';

	const teams: TT6Team[] = teamsRaw as unknown as TT6Team[];
	const teamsUnsorted = [...teams].sort((a, b) => a.teamNum - b.teamNum);
	$: teams.sort((a, b) => b.score - a.score);

	const challenges = challengesRaw as unknown as Record<
		TT6ChallengeCategory,
		TT6PublicChallengeDefinition[]
	>;
	const rawChallengesList = [...challenges.challenge, ...challenges.find, ...challenges.hard];

	const challengeMap: Record<string, TT6PublicChallengeDefinition> = rawChallengesList.reduce(
		(a, x) => ({ ...a, [x.id]: x }),
		{},
	);

	const teamsCompletedChallenges: Record<string, Set<string>> = teams.reduce(
		(a, x) => ({
			...a,
			[x.id]: new Set(
				rawChallengesList
					.filter((c) => isTt6ChallengeComplete(c, x.challengeProgress))
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

	const overallChallengeProgress: TT6ChallengeProgress = {
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

	let selectedChallenge: null | TT6PublicChallengeDefinition = null;

	const openCallback = (c: TT6PublicChallengeDefinition) => {
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
	<title>Crosslake Crossover Results</title>
	<meta
		name="description"
		content="Final standings from Seattle Transit Trek's June 2026 event, the Crosslake Crossover"
	/>
</svelte:head>

<div id="outerWrap">
	<img src={bgImg} alt="" class="fallbackBgImg" />

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

	<TopLogo />

	<section class="hero">
		<h1>
			<span class="cWrap cw1"
				><span class="card c1"><span class="c11">Res</span><span class="c12">ults</span></span
				></span
			>
		</h1>
	</section>

	<section class="standardCardWrap">
		<Tt6Card animate={false} fillWidth>
			<div class="podium">
				<h2>Podium</h2>

				{#each teams as team, i}
					<div class={`place${i + 1}`}>
						<span class="rank">{i + 1}</span>
						<h3>
							Team {team.teamNum}: {team.name}
						</h3>
						<p>
							Total Score: <code>{Math.floor(team.score)}</code>
						</p>
					</div>
				{/each}
			</div>
		</Tt6Card>
	</section>

	<section class="standardCardWrap">
		<Tt6Card animate={false} fillWidth>
			<div class="challengePopularity">
				<h2>Challenge Popularity</h2>
				<table>
					<tr><th>Challenge</th><th>Completion</th></tr>
					{#each challengeIdArray
						.map((cid) => ({ cid, num: numCompleteEachChallenge[cid] }))
						.sort((a, b) => b.num - a.num) as challengeId}
						<tr>
							<td style="max-width: 100px">
								{#if challengeMap[challengeId.cid].shrinkTitle}
									<Tt6ShrinkingTitle text={challengeMap[challengeId.cid].title} />
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
			</div>
		</Tt6Card>
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
			{#each iterateTt6Categories(challenges) as category}
				<div class={`card challenges ${category}`}>
					<h3>{tt6ChallengeCategoryNames[category]}</h3>
				</div>

				<ul class={`challengeList ${category}`}>
					{#each challenges[category] as challenge}
						<li>
							<button on:click={() => openCallback(challenge)}>
								{#if isTt6ChallengeComplete(challenge, teamProgress)}
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

	<section class="standardCardWrap">
		<Tt6Card animate={false} fillWidth>
			<h2>Team Breakdown</h2>
			<div class="teamBreakdownWrap">
				<table class="teamBreakdown">
					<tr>
						<th>Challenge</th>
						{#each teamsUnsorted as team}
							<td>
								<span style="font-size: 1.5em;white-space:nowrap;">{team.teamNum}</span>
								<br />
								<span style="font-size: 0.8em;">{team.name}</span>
							</td>
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
		</Tt6Card>
	</section>

	<div style="text-align: center; margin-top: 10vh; margin-bottom: 20vh;">
		<Tt6Card animate={false}>
			<h2>Thanks for Playing!</h2>
			<BigBtn
				href="/tt6/"
				text="Back"
				color={['rgb(0, 160, 223)', 'rgba(255, 255, 255, 0.1)']}
				customStyles="box-shadow: none; clip-path: polygon(1em 0%, 100% 0%, 100% calc(100% - 1em), calc(100% - 1em) 100%, 0% 100%, 0% 1em)"
			/>
		</Tt6Card>
	</div>
</div>

{#if selectedChallenge !== null}
	<ChallengeView
		challenge={selectedChallenge}
		allChallenges={rawChallengesList}
		teamNum={selectedTeam >= 0 ? teamsUnsorted[selectedTeam - 1].teamNum : 1}
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

	.fallbackBgImg {
		object-fit: cover;
		object-position: center;
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		height: 100lvh;
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
	}

	.hero {
		width: 100%;
		overflow: hidden;
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.fallbackBgImg {
		object-fit: cover;
		object-position: center;
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		height: 100lvh;
	}

	.hero h1 {
		color: white;
		text-align: center;
		font-size: min(15vh, 10vw);
		font-weight: 900;

		margin-top: 250px;
	}

	.hero .card {
		position: relative;
		display: inline-block;
		background: none;
		text-align: center;
		padding: 0em 0.2em;
		border-radius: 1vh;
		margin: 1vh;
		overflow: hidden;

		--radius: 2vh;
		--a: calc(var(--radius) / tan(67.5deg));
		--b: calc(var(--radius) / tan(67.5deg) / sqrt(2));
	}

	.hero .card::before {
		content: '';
		position: absolute;
		z-index: -1;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: linear-gradient(
			to top,
			rgba(4, 100, 176, 0.5),
			rgba(1, 47, 104, 0.7) 30%,
			rgba(2, 14, 34, 0.7)
		);
	}

	.hero .card span {
		mix-blend-mode: add;
		vertical-align: top;
		display: inline-block;
	}

	.hero .card .c12 {
		padding-bottom: 0.3em;
	}

	.hero .card .c11 {
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgb(0, 160, 223));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
		-webkit-text-stroke: 1px rgba(105, 255, 255, 0.6);
	}

	.hero .card .c12 {
		background: linear-gradient(to bottom, rgba(230, 248, 227, 0.1), rgba(61, 174, 43, 0.8));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
		-webkit-text-stroke: 1px rgba(79, 228, 192, 0.6);
	}

	.hero .cw1 {
		margin-top: 0;
		--xAmt: 0;
	}

	.hero .c1 {
		clip-path: shape(
			from var(--radius) 0,
			line to calc(100% - var(--radius)) 0,
			arc to 100% var(--radius) of var(--radius) cw,
			line to 100% calc(100% - var(--radius)),
			arc to calc(100% - var(--radius)) 100% of var(--radius) cw,
			line to calc(53.5% + var(--a)) 100%,
			arc to calc(53.5% - var(--b)) calc(100% - var(--b)) of var(--radius) cw,
			line to calc(46.5% + var(--b)) calc(75% + var(--b)),
			arc to calc(46.5% - var(--a)) 75% of var(--radius) ccw,
			line to calc(5% + var(--a)) 75%,
			arc to calc(5% - var(--b)) calc(75% - var(--b)) of var(--radius) cw,
			line to var(--b) calc(75% - 25% * 5 / 7 + var(--b)),
			arc to 0 calc(75% - 25% * 5 / 7 - var(--a)) of var(--radius) cw,
			line to 0 var(--radius),
			arc to var(--radius) 0 of var(--radius) cw,
			close
		);
	}

	.hero .c1 span {
		transform: translateY(-0.1em);
	}

	.cWrap {
		filter: url(#knockout-glow);
		display: block;

		--xAmt: 0;
		--delay: 1.8s;
		--speed: 1s;
		--zoom: 1;
		transform: translateX(var(--xAmt)) scale(var(--zoom));
		opacity: 1;
	}

	@media (max-width: 800px) {
		.hero h1 {
			font-size: min(15vh, 15vw);
		}

		.hero .cw1 {
			--xAmt: 0;
		}
	}

	h2 {
		text-shadow: 0 0 15px black;
		-webkit-text-stroke: 2px black;
		paint-order: stroke fill;
		font-size: 40px;
	}

	.standardCardWrap {
		width: 60%;
		margin-left: 20vw;
		margin-top: 10vh;
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
		padding-left: 80px;
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
		text-align: left;
	}

	.podium > div > p {
		margin: 5px 0 0 0;
		text-align: left;
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
		text-align: left;
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
		background: linear-gradient(to right, #150f37, #0596cf 100%);
		left: 0;
		top: 1px;
		box-sizing: border-box;
		--notch: 0.6em;
		clip-path: polygon(
			var(--notch) 0%,
			100% 0%,
			100% calc(100% - var(--notch)),
			calc(100% - var(--notch)) 100%,
			0% 100%,
			0% var(--notch)
		);
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
		background: rgba(255, 255, 255, 0.05);
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
