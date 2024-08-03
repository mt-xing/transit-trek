<script lang="ts">
	import type { TT4Team } from '../../../../../types/tt4/team';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams } = data;
	teams.sort((a, b) => b.score - a.score);

	const res: Map<number, TT4Team[]> = new Map();
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
						Team {team.teamNum}: {team.name ?? '🛑 NO TEAM NAME YET'}{team.bioBreakTaken
							? ''
							: ' - 🛑 NO BIO BREAK YET'}
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
</style>
