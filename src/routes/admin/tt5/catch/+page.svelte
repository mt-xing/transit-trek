<script lang="ts">
	import type { TT5GameState } from '../../../../types/tt5/game';
	import type { TT5Team } from '../../../../types/tt5/team';
	import { canTt5TeamBeCaught } from '../../../../utils/tt5/catch';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams } = data;
	$: teams.sort((a, b) => a.teamNum - b.teamNum);

	let selectedTeam: undefined | TT5Team;
	let selectedTeamStatus: undefined | boolean;
	let gameStateCanCatch: undefined | boolean;

	$: validCatch = !!(selectedTeamStatus && gameStateCanCatch);

	$: {
		(async (teamId: string | undefined) => {
			if (!teamId) {
				return;
			}
			const res = await fetch(`/admin/tt5/catch/api?id=${teamId}`);
			const teamData = (await res.json()) as TT5Team;

			const res2 = await fetch('/admin/tt5/catch/gameApi');
			const gameState = (await res2.json()) as TT5GameState;

			gameStateCanCatch = gameState.t === 'ongoing' && gameState.catchEnabled;
			selectedTeamStatus = canTt5TeamBeCaught(teamData.catchTimes);
		})(selectedTeam?.id);
	}
</script>

<h1>Chaser Central</h1>

<select
	bind:value={selectedTeam}
	on:change={() => {
		selectedTeamStatus = undefined;
	}}
>
	<option value={undefined}>-- SELECT A TEAM --</option>
	{#each teams as team}
		<option value={team}>{team.teamNum}: {team.name}</option>
	{/each}
</select>

{#if selectedTeam}
	<h2>{selectedTeam.teamNum}: {selectedTeam.name}</h2>

	{#if selectedTeamStatus === undefined || gameStateCanCatch === undefined}
		<h3>⚠️⚠️⚠️ Loading Status</h3>
	{:else if gameStateCanCatch === false}
		<h3 class="alert">
			🛑🛑🛑 You are currently <strong>NOT</strong> permitted to catch teams.
		</h3>
	{:else if selectedTeamStatus === false}
		<h3 class="alert">
			🛑🛑🛑 This team is currently <strong>NOT</strong> eligible to be caught.
		</h3>
	{/if}

	{#if selectedTeamStatus !== undefined && gameStateCanCatch !== undefined}
		<form method="POST" action="?/catchTeam">
			<input type="hidden" bind:value={selectedTeam.id} name="id" />
			<button type="submit" style="padding: 1em 2em;">
				{#if validCatch}
					Catch Team
				{:else}
					<strong>MANUAL OVERRIDE</strong><br />and catch team anyways
				{/if}
			</button>
		</form>
	{/if}
{/if}

<p style="margin-top:3em"><a href="/admin">Discard and Go Back</a></p>

<style>
	button {
		padding: 0.5em 1em;
	}

	select {
		padding: 1em 2em;
	}

	.alert {
		font-size: 30px;
		border: 10px red solid;
		background: yellow;
		padding: 1em 0.5em;
	}
</style>
