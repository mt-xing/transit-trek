<script lang="ts">
	import type { Team } from '../../../types/team';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams, gameState } = data;
	if (!gameState) {
		throw new Error();
	}

	$: teams.sort((a, b) => a.teamNum - b.teamNum);

	let selectedTeam: undefined | Team;
</script>

<h1>Team Finishes</h1>

<select bind:value={selectedTeam}>
	<option value={undefined}>-- SELECT A TEAM --</option>
	{#each teams as team}
		<option value={team}>{team.teamNum}: {team.name}</option>
	{/each}
</select>

{#if gameState.t !== 'ongoing'}
	<p style="background: red;color:white;"><strong>The game is not currently running.</strong></p>
{/if}

{#if selectedTeam}
	<h2>{selectedTeam.teamNum}: {selectedTeam.name}</h2>
	{#if selectedTeam.finishTime === undefined}
		<form method="POST" action="?/finishTeam">
			<input type="hidden" bind:value={selectedTeam.id} name="id" />
			<button type="submit">Mark Team as Finished</button>
		</form>
	{:else}
		<p style="background: red;color:white;"><strong>This team has already finished.</strong></p>
		<form method="POST" action="?/unfinishTeam">
			<input type="hidden" bind:value={selectedTeam.id} name="id" />
			<button type="submit">UNDO and Mark Team as NOT Finished</button>
		</form>
	{/if}
{/if}

<p style="margin-top:3em"><a href="/admin">Discard and Go Back</a></p>

<style>
	button {
		padding: 0.5em 1em;
	}
</style>
