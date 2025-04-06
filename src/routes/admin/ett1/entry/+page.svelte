<script lang="ts">
	import ChallengeEntry from '../../../../components/ett1/ett1ChallengeEntry.svelte';
	import {
		ett1ChallengeCategoryNames,
		type ETT1ChallengeDefinition,
	} from '../../../../types/ett1/challenge';
	import type { ETT1Team } from '../../../../types/ett1/team';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams, gameState, challenges } = data;
	if (!gameState) {
		throw new Error();
	}

	$: teams.sort((a, b) => a.teamNum - b.teamNum);

	let selectedTeam: undefined | ETT1Team;
	let selectedChallenge: undefined | ETT1ChallengeDefinition;

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
	function cleanStr(str: string) {
		return str.toLowerCase().replace(/[^a-z]/gi, '');
	}
	$: filteredChallenges = challenges.filter((x) =>
		filter ? cleanStr(x.title).indexOf(cleanStr(filter)) !== -1 : true,
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
		{#each challenges.filter( (x) => (filter ? cleanStr(x.title).indexOf(cleanStr(filter)) !== -1 : true), ) as challenge}
			<option value={challenge}
				>{ett1ChallengeCategoryNames[challenge.category]}: {challenge.title}</option
			>
		{/each}
	</select>
</p>

{#if selectedTeam && selectedChallenge}
	<h2>
		{selectedTeam.teamNum}: {selectedTeam.name}
		<br />
		{ett1ChallengeCategoryNames[selectedChallenge.category]}: {selectedChallenge.title}
	</h2>

	<ChallengeEntry
		challenge={selectedChallenge}
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
