<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams } = data;
	teams.sort((a, b) => b.score - a.score);
</script>

<h1>Team Rankings</h1>

<ol>
	{#each teams as team}
		<li>
			({team.score} pts) Team {team.teamNum}: {team.name ??
				'🛑 NO TEAM NAME YET'}{team.bioBreakTaken ? '' : ' - 🛑 NO BIO BREAK YET'}
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
