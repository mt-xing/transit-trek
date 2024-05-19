<script lang="ts">
	import type { Team } from '../../../types/team';
	import { isChallengeComplete } from '../../../utils/challenge';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams, gameState, challenges } = data;
	if (!gameState) {
		throw new Error();
	}
	const finalChallenges = challenges.filter((x) => x.mapPos === 10);

	$: teams.sort((a, b) => a.teamNum - b.teamNum);

	let selectedTeam: undefined | Team;
	let selectedTeamStatus: undefined | boolean;

	$: {
		(async (teamId: string | undefined) => {
			if (!teamId) {
				return;
			}
			const res = await fetch(`/admin/finish/api?id=${teamId}`);
			const teamData = (await res.json()) as Team;
			const done = finalChallenges.some((x) =>
				isChallengeComplete(x, {
					allChallenges: challenges,
					gameState,
					challengeProgress: teamData.challengeProgress,
				}),
			);
			selectedTeamStatus = done;
		})(selectedTeam?.id);
	}
</script>

<h1>Team Finishes</h1>

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

{#if gameState.t !== 'ongoing'}
	<p style="background: red;color:white;"><strong>The game is not currently running.</strong></p>
{/if}

{#if selectedTeam}
	<h2>{selectedTeam.teamNum}: {selectedTeam.name}</h2>

	{#if selectedTeamStatus === undefined}
		<h3>⚠️⚠️⚠️ Loading Team Status</h3>
	{:else if selectedTeamStatus === false}
		<h3 class="alert">
			🛑🛑🛑 This team has <strong>NOT</strong> completed the final challenge yet.
		</h3>
	{/if}

	{#if selectedTeam.finishTime === undefined}
		<form method="POST" action="?/finishTeam">
			<input type="hidden" bind:value={selectedTeam.id} name="id" />
			<button type="submit">
				{#if selectedTeamStatus === true}
					Mark Team as Finished
				{:else}
					<strong>MANUAL OVERRIDE</strong><br />and mark team as finished anyways
				{/if}
			</button>
		</form>
		<p class="seperator">
			To the person working the finish line at Hing Hay Park: you should not need to edit anything
			below this line
		</p>
	{:else}
		<p style="background: red;color:white;"><strong>This team has already finished.</strong></p>
		<form method="POST" action="?/unfinishTeam">
			<input type="hidden" bind:value={selectedTeam.id} name="id" />
			<button type="submit">UNDO and Mark Team as NOT Finished</button>
		</form>

		<p class="seperator">
			To the person working the finish line at Hing Hay Park: you should not need to edit anything
			below this line
		</p>

		<h2>Manual Edit</h2>
		<form method="POST" action="?/changeFinishTime">
			<input type="hidden" bind:value={selectedTeam.id} name="id" />
			<input type="number" step="1" bind:value={selectedTeam.finishTime} name="finishTime" />
			<p>Finish Time: {new Date(selectedTeam.finishTime)}</p>
			<p>This time does <strong>not</strong> include penalties (set below)</p>
			<button type="submit">Manual Override Team Finish Time</button>
		</form>
	{/if}

	<h2>Penalties</h2>
	<form method="POST" action="?/changePenalty">
		<input type="hidden" bind:value={selectedTeam.id} name="id" />
		<input type="number" step="1" bind:value={selectedTeam.timePenaltyMin} name="timePenaltyMin" />
		<button type="submit">Save Team Penalty (minutes)</button>
	</form>
{/if}

<p style="margin-top:3em"><a href="/admin">Discard and Go Back</a></p>

<style>
	button {
		padding: 0.5em 1em;
	}

	select {
		padding: 1em 2em;
	}

	.seperator {
		font-weight: bold;
		margin-top: 100px;
		margin-bottom: 200px;
		font-size: 1.5em;
		border-top: 5px black solid;
		padding: 0 1.5em;
	}

	.alert {
		font-size: 30px;
		border: 10px red solid;
		background: yellow;
		padding: 1em 0.5em;
	}
</style>
