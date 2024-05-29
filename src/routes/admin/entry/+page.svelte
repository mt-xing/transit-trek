<script lang="ts">
	import ChallengeEntry from '../../../components/challengeEntry.svelte';
	import type { ChallengeDefinition } from '../../../types/challenge';
	import type { Team } from '../../../types/team';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams, gameState, challenges } = data;
	if (!gameState) {
		throw new Error();
	}

	$: teams.sort((a, b) => a.teamNum - b.teamNum);
	$: validChallenges = challenges
		.filter((x) => x.type !== 'subtask')
		.sort((a, b) => a.mapPos - b.mapPos);

	let selectedTeam: undefined | Team;
	let selectedChallenge: undefined | ChallengeDefinition;

	function populateProgress() {
		if (
			selectedTeam &&
			selectedChallenge &&
			!selectedTeam.challengeProgress[selectedChallenge.id]
		) {
			selectedTeam.challengeProgress[selectedChallenge.id] = {
				progress: [],
			};
		}
	}

	let filter = '';

	$: filteredChallenges = validChallenges.filter((x) =>
		filter ? x.title.toLowerCase().indexOf(filter) !== -1 : true,
	);

	let filterRef: HTMLInputElement | undefined;

	$: {
		if (filteredChallenges.length === 1) {
			// eslint-disable-next-line prefer-destructuring
			selectedChallenge = filteredChallenges[0];
			populateProgress();
		} else if (filteredChallenges.length === 0) {
			selectedChallenge = undefined;
		}
	}
</script>

<h1>Challenge Status Entry</h1>

{#if gameState.t !== 'ongoing'}
	<p style="background: red;color:white;"><strong>The game is not currently running.</strong></p>
{/if}

<p>
	<!-- svelte-ignore a11y-autofocus -->
	<select
		autofocus={true}
		bind:value={selectedTeam}
		on:change={() => {
			populateProgress();
			filter = '';
			filterRef?.focus();
		}}
	>
		<option value={undefined}>-- SELECT A TEAM --</option>
		{#each teams as team}
			<option value={team}>{team.teamNum}: {team.name}</option>
		{/each}
	</select>
</p>

<p>Challenge Filter: <input type="string" bind:value={filter} bind:this={filterRef} /></p>

<p>
	<select bind:value={selectedChallenge} on:change={populateProgress}>
		<option value={undefined}>-- SELECT A CHALLENGE --</option>
		{#each validChallenges.filter((x) => (filter ? x.title
						.toLowerCase()
						.indexOf(filter.toLowerCase()) !== -1 : true)) as challenge}
			<option value={challenge}>{challenge.mapPos}: {challenge.title}</option>
		{/each}
	</select>
</p>
<p>
	Parent tasks aren't shown here. Unlock them through
	<a href="/admin/entry/batchUnlock">Batch Unlock</a>
</p>

{#if selectedTeam && selectedChallenge}
	<h2>
		{selectedTeam.teamNum}: {selectedTeam.name}
		<br />
		{selectedChallenge.mapPos}: {selectedChallenge.title}
	</h2>

	<ChallengeEntry
		challenge={selectedChallenge}
		allChallenges={challenges}
		{gameState}
		challengeProgress={selectedTeam.challengeProgress}
		teamId={selectedTeam.id}
	/>
{/if}

<p style="margin-top:3em"><a href="/admin">Discard and Go Back</a></p>

<style>
	select {
		padding: 1em 2em;
	}
</style>
