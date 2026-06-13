<script lang="ts">
	import ChallengeEntry from '../../../../components/tt6/tt6ChallengeEntry.svelte';
	import {
		tt6ChallengeCategoryNames,
		type TT6ChallengeDefinition,
	} from '../../../../types/tt6/challenge';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams, gameState, challenges } = data;
	if (!gameState) {
		throw new Error();
	}

	$: teams.sort((a, b) => a.teamNum - b.teamNum);

	let selectedTeamNum: undefined | number;
	$: selectedTeam =
		selectedTeamNum !== undefined ? teams.find((x) => x.teamNum === selectedTeamNum) : undefined;
	let selectedChallenge: undefined | TT6ChallengeDefinition;

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

	let teamRef: HTMLInputElement | undefined;
	let filterRef: HTMLInputElement | undefined;
	let entryRef: ChallengeEntry | undefined;

	$: {
		if (filteredChallenges.length === 1) {
			// eslint-disable-next-line prefer-destructuring
			selectedChallenge = filteredChallenges[0];
			populateProgress();
		} else if (filteredChallenges.length === 0) {
			selectedChallenge = undefined;
		}
	}

	function keyboardShortcut(event: KeyboardEvent) {
		'qwertyuioip'.split('').forEach((k, i) => {
			if (event.key === k) {
				entryRef?.keyOption({ t: 'toggleCompletion', boxId: i });
			}
		});
		switch (event.key) {
			case 'z':
				entryRef?.keyOption({ t: 'commit' });
				break;
			case 'f':
				entryRef?.keyOption({ t: 'toggleFail' });
				break;
			case 'b':
				entryRef?.keyOption({ t: 'toggleBonus' });
				break;
			case 'a':
				entryRef?.keyOption({ t: 'override', status: undefined });
				break;
			case 's':
				entryRef?.keyOption({ t: 'override', status: true });
				break;
			case 'd':
				entryRef?.keyOption({ t: 'override', status: false });
				break;
			default:
				break;
		}
	}
</script>

<h1>Challenge Status Entry</h1>

{#if gameState.t !== 'ongoing'}
	<p style="background: red;color:white;"><strong>The game is not currently running.</strong></p>
{/if}

<div class="headWrap">
	<div>
		<p>
			<button
				on:click={() => {
					selectedTeamNum = undefined;
					filter = '';
					teamRef?.focus();
				}}
			>
				Clear All Filters
			</button>
		</p>
		<p>
			<!-- svelte-ignore a11y-autofocus -->
			Team Number:
			<input autofocus type="number" bind:value={selectedTeamNum} step="1" bind:this={teamRef} />
		</p>
		<p>Challenge Filter: <input type="string" bind:value={filter} bind:this={filterRef} /></p>
		<p>Input Commands: <input type="string" on:keydown={keyboardShortcut} value="" readonly /></p>
	</div>
	<div>
		<p>
			<select
				bind:value={selectedTeamNum}
				on:change={() => {
					populateProgress();
					filter = '';
					filterRef?.focus();
				}}
			>
				<option value={undefined}>-- SELECT A TEAM --</option>
				{#each teams as team}
					<option value={team.teamNum}>{team.teamNum}: {team.name}</option>
				{/each}
			</select>
		</p>

		<p>
			<select bind:value={selectedChallenge} on:change={populateProgress}>
				<option value={undefined}>-- SELECT A CHALLENGE --</option>
				{#each challenges.filter( (x) => (filter ? cleanStr(x.title).indexOf(cleanStr(filter)) !== -1 : true), ) as challenge}
					<option value={challenge}
						>{tt6ChallengeCategoryNames[challenge.category]}: {challenge.shrinkTitle
							? challenge.title.split('.')[0]
							: challenge.title}</option
					>
				{/each}
			</select>
		</p>
	</div>
	{#if selectedTeam && selectedChallenge}
		<h2>
			{selectedTeam.teamNum}: {selectedTeam.name}
			<br />
			{tt6ChallengeCategoryNames[selectedChallenge.category]}: {selectedChallenge.shrinkTitle
				? selectedChallenge.title.split('.')[0]
				: selectedChallenge.title}
		</h2>
	{/if}
</div>

{#if selectedTeam && selectedChallenge}
	<ChallengeEntry
		challenge={selectedChallenge}
		allChallenges={challenges}
		challengeProgress={selectedTeam.challengeProgress}
		teamId={selectedTeam.id}
		teamScore={selectedTeam.score}
		teamNum={selectedTeam.teamNum}
		bind:this={entryRef}
	/>
{/if}

<p style="margin-top:3em"><a href="/admin">Discard and Go Back</a></p>

<style>
	select,
	button {
		padding: 1em 2em;
	}

	.headWrap {
		display: flex;
		flex-direction: row;
		align-items: end;
		gap: 10px;
	}

	@media (max-width: 1000px) {
		.headWrap {
			flex-direction: column;
			align-items: start;
			gap: 0;
		}
	}
</style>
