<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams } = data;
	teams.sort((a, b) => a.teamNum - b.teamNum);
</script>

<h1>View Team Dashboards</h1>

<ul>
	{#each teams as team}
		<li>
			<a href="/tt6/game?id={team.secret}" rel="external">
				{team.teamNum}: {team.name} (View Dashboard)
			</a>
		</li>
	{/each}
</ul>

<p><a href="/admin">Back</a></p>

<style>
	li {
		font-size: 20px;
		margin: 0.5em 0;
	}
</style>
