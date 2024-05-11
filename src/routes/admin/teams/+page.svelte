<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams } = data;
	teams.sort((a, b) => a.teamNum - b.teamNum);
</script>

<h1>Teams</h1>

<ul>
	{#each teams as team}
		<li>
			<a href="/admin/teams/edit?id={team.id}">{team.teamNum}: {team.name}</a>
		</li>
	{/each}
</ul>

<form method="POST" action="?/newTeam">
	<button type="submit">Create New Team</button>
</form>

<p><a href="/admin">Back</a></p>

<style>
	li {
		font-size: 20px;
		margin: 0.5em 0;
	}

	button {
		padding: 0.5em 1em;
	}
</style>
