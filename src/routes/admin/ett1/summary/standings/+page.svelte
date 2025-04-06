<script lang="ts">
	import type { ETT1ChallengeProgress, ETT1Team } from '../../../../../types/ett1/team';
	import { isEtt1ChallengeComplete } from '../../../../../utils/ett1/challenge';
	import { getColor } from '../../../../../utils/ett1/colors';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams, challenges } = data;
	teams.sort((a, b) => b.score - a.score);

	const res: Map<number, ETT1Team[]> = new Map();
	teams.forEach((t) => {
		const existing = res.get(t.score);
		if (existing) {
			res.set(t.score, existing.concat(t));
		} else {
			res.set(t.score, [t]);
		}
	});
	const sortedArr = Array.from(res)
		.sort((a, b) => b[0] - a[0])
		.map(([_, t]) => t);

	const numChallengesComplete = (progress: ETT1ChallengeProgress) =>
		challenges.filter((challenge) => isEtt1ChallengeComplete(challenge, progress)).length;
</script>

<h1>Team Rankings</h1>

<p>This page does <strong>NOT</strong> auto-update. Refresh for new data.</p>

<ol>
	{#each sortedArr as teamRank}
		<li>
			<strong>{teamRank[0].score} pts</strong>
			<ul>
				{#each teamRank as team}
					<li>
						<span class="colorBadge" style="--color: {getColor(team.teamNum)};"></span> Team {team.teamNum}:
						{team.name ?? '🛑 NO TEAM NAME YET'}{team.bioBreakTaken ? '' : ' - 🛑 NO BIO BREAK YET'}
						<br />
						Completed Challenges: {numChallengesComplete(team.challengeProgress)}
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ol>

<p><a href="/admin">Back</a></p>

<style>
	li {
		font-size: 20px;
		margin: 0.5em 0;
	}
	.colorBadge {
		display: inline-block;
		height: 1em;
		width: 1em;
		background: var(--color);
	}
</style>
