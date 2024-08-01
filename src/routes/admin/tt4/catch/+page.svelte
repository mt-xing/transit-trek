<script lang="ts">
	import type { TT4GameState } from '../../../../types/tt4/game';
	import type { TT4Team } from '../../../../types/tt4/team';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams } = data;
	$: teams.sort((a, b) => a.teamNum - b.teamNum);

	let selectedTeam: undefined | TT4Team;
	let selectedTeamStatus: undefined | boolean;
	let gameStateCanCatch: undefined | boolean;

	$: validCatch = !!(selectedTeamStatus && gameStateCanCatch);

	const COOLDOWN = 15 * 1000 * 60; // 15 min

	$: {
		(async (teamId: string | undefined) => {
			if (!teamId) {
				return;
			}
			const res = await fetch(`/admin/tt4/catch/api?id=${teamId}`);
			const teamData = (await res.json()) as TT4Team;

			const res2 = await fetch('/admin/tt4/catch/gameApi');
			const gameState = (await res2.json()) as TT4GameState;

			gameStateCanCatch = gameState.t === 'ongoing' && gameState.catchEnabled;
			selectedTeamStatus =
				teamData.catchTimes.length === 0 ||
				teamData.catchTimes[teamData.catchTimes.length - 1] + COOLDOWN < new Date().getTime();
		})(selectedTeam?.id);
	}
</script>

<h1>Catcher Central</h1>

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
