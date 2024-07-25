<script lang="ts">
	import type { TT3ChallengeDefinition } from '../../../../../types/tt3/challenge';
	import type { TT3Team } from '../../../../../types/tt3/team';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams, gameState, challenges } = data;
	if (!gameState) {
		throw new Error();
	}

	$: teams.sort((a, b) => a.teamNum - b.teamNum);
	$: validChallenges = challenges
		.filter((x) => x.type === 'subtask')
		.sort((a, b) => a.mapPos - b.mapPos);

	let selectedTeam: undefined | TT3Team;
	let selectedChallenge: undefined | TT3ChallengeDefinition;

	let manualUnlock: undefined | boolean;
	let manualComplete: undefined | boolean;
	let unlockSubtasks: string = '';

	function addAllSubtasks(mapPos: string[], c: TT3ChallengeDefinition) {
		mapPos.push(c.id);
		if (c.type !== 'subtask') {
			return;
		}
		challenges
			.filter((x) => x.mapPos === c.subtaskInfo.mapPos)
			.forEach(addAllSubtasks.bind(undefined, mapPos));
	}
	function update() {
		if (selectedTeam && selectedChallenge && selectedChallenge.type === 'subtask') {
			manualUnlock = selectedTeam.challengeProgress[selectedChallenge.id]?.manualUnlock;
			manualComplete = selectedTeam.challengeProgress[selectedChallenge.id]?.manualComplete;

			const mapPos: string[] = [];
			addAllSubtasks(mapPos, selectedChallenge);
			unlockSubtasks = mapPos.join(',');
		}
	}
</script>

<h1>Batch Unlock Tasks</h1>

{#if gameState.t !== 'ongoing'}
	<p style="background: red;color:white;"><strong>The game is not currently running.</strong></p>
{/if}

<p>
	<!-- svelte-ignore a11y-autofocus -->
	<select autofocus={true} bind:value={selectedTeam} on:change={update}>
		<option value={undefined}>-- SELECT A TEAM --</option>
		{#each teams as team}
			<option value={team}>{team.teamNum}: {team.name}</option>
		{/each}
	</select>
</p>

<p>
	<select bind:value={selectedChallenge} on:change={update}>
		<option value={undefined}>-- SELECT A CHALLENGE --</option>
		{#each validChallenges as challenge}
			<option value={challenge}>{challenge.mapPos}: {challenge.title}</option>
		{/each}
	</select>
</p>

{#if selectedTeam && selectedChallenge}
	<h2>
		{selectedTeam.teamNum}: {selectedTeam.name}
		<br />
		{selectedChallenge.mapPos}: {selectedChallenge.title}
	</h2>

	<form method="POST" action="?/batchUnlock">
		<h2>Unlock</h2>
		<p>
			Unlock status:
			<select bind:value={manualUnlock} name="manualUnlock">
				<option value={undefined}>No Override (DEFAULT)</option>
				<option value={true}>UNLOCK manual</option>
				<option value={false}>LOCK manual</option>
			</select>
		</p>
		<input type="hidden" bind:value={selectedTeam.id} name="teamId" />
		<input type="hidden" bind:value={unlockSubtasks} name="subtasks" />
		<button type="submit">Batch Save For All Subtasks</button>
	</form>

	<form method="POST" action="?/complete">
		<h2>Complete</h2>
		<p>
			Complete status:
			<select bind:value={manualComplete} name="manualComplete">
				<option value={undefined}>No Override (DEFAULT)</option>
				<option value={true}>COMPLETE manual</option>
				<option value={false}>INCOMPLETE manual</option>
			</select>
		</p>
		<input type="hidden" bind:value={selectedTeam.id} name="teamId" />
		<input type="hidden" bind:value={selectedChallenge.id} name="challengeId" />
		<button type="submit">Save For Task</button>
	</form>
{/if}

<p style="margin-top:3em"><a href="/admin/tt3/entry">Discard and Go Back</a></p>

<style>
	select {
		padding: 1em 2em;
	}
</style>
