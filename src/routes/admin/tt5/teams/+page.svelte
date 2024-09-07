<script lang="ts">
	import type { PageData } from './$types';
	import { copyGreeting } from './greetingMsg';

	export let data: PageData;

	const { teams } = data;
	teams.sort((a, b) => a.teamNum - b.teamNum);
</script>

<h1>Teams</h1>

<ul>
	{#each teams as team}
		<li>
			<a href="/admin/tt5/teams/edit?id={team.id}">{team.teamNum}: {team.name}</a> -
			<a target="_blank" href="/tt5/game?id={team.secret}">(View Dashboard)</a> -
			<button on:click={copyGreeting.bind(undefined, team.secret, team.teamNum)}
				>Copy Greeting</button
			>
		</li>
	{/each}
</ul>

<form method="POST" action="?/newTeam">
	<input type="hidden" value="unknown" name="unknown" />
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
