<script lang="ts">
	import type { TT6ChallengeDefinition } from '../../types/tt6/challenge';
	import type { TT6ChallengeProgress } from '../../types/tt6/team';
	import assertUnreachable from '../../utils/assertUnreachable';
	import Tt6ChallengeView from './tt6ChallengeView.svelte';

	export let teamId: string;
	export let challenge: TT6ChallengeDefinition;
	export let allChallenges: TT6ChallengeDefinition[];
	export let challengeProgress: TT6ChallengeProgress;
	export let teamScore: number;
	export let teamNum: number;

	let submitRef: HTMLButtonElement | undefined;

	type ChangeValue =
		| {
				t: 'toggleCompletion';
				boxId: number;
		  }
		| {
				t: 'commit';
		  }
		| {
				t: 'toggleFail';
		  }
		| {
				t: 'toggleBonus';
		  }
		| {
				t: 'override';
				status: boolean | undefined;
		  };
	export function keyOption(value: ChangeValue) {
		switch (value.t) {
			case 'toggleCompletion':
				changeCheckbox(value.boxId);
				break;
			case 'commit':
				submitRef?.click();
				break;
			case 'toggleFail':
				changeFailed();
				break;
			case 'toggleBonus':
				changeBonus();
				break;
			case 'override': {
				progress.manualComplete = value.status;
				break;
			}
			default:
				assertUnreachable(value);
		}
	}

	$: progress = challengeProgress[challenge.id];

	$: linkedChallenge = challenge.linkId
		? allChallenges.find((x) => x.id === challenge.linkId)
		: undefined;

	$: challengeJson = JSON.stringify(challenge);
	$: linkedChallengeJson = JSON.stringify(linkedChallenge);

	function changeCheckbox(index: number) {
		if (challenge.type === 'single' && index > 0) {
			return;
		}
		if (challenge.type === 'multi' && index >= challenge.partDescs.length) {
			return;
		}

		const current = progress.progress?.[index] ?? false;
		if (progress.progress === undefined) {
			progress.progress = [];
		}
		for (let i = progress.progress.length; i < index; i++) {
			progress.progress[i] = false;
		}
		progress.progress[index] = !current;

		challengeProgress = { ...challengeProgress, [challenge.id]: progress };
	}

	function changeLinkedCheckbox(index: number) {
		if (!linkedChallenge) {
			return;
		}
		const current = challengeProgress[linkedChallenge.id]?.progress?.[index] ?? false;
		if (challengeProgress[linkedChallenge.id] === undefined) {
			challengeProgress[linkedChallenge.id] = {
				progress: [],
			};
		}
		const linkedProgress = challengeProgress[linkedChallenge.id];
		if (linkedProgress.progress === undefined) {
			linkedProgress.progress = [];
		}
		for (let i = linkedProgress.progress.length; i < index; i++) {
			linkedProgress.progress[i] = false;
		}
		linkedProgress.progress[index] = !current;

		challengeProgress = { ...challengeProgress, [linkedChallenge.id]: linkedProgress };
	}

	function changeBonus() {
		if (progress.bonus) {
			progress.bonus = false;
		} else {
			progress.bonus = true;
		}

		challengeProgress = { ...challengeProgress, [challenge.id]: progress };
	}

	function changeFailed() {
		if (progress.failed) {
			progress.failed = false;
		} else {
			progress.failed = true;
		}

		challengeProgress = { ...challengeProgress, [challenge.id]: progress };
	}

	const entryShortcuts = 'qwertyuiop';
</script>

{#if progress}
	<div class="secWrap" style="background: black;">
		{#key challenge.id}
			<Tt6ChallengeView
				isFloat={false}
				{allChallenges}
				{challengeProgress}
				{challenge}
				closeCallback={() => {}}
				score={teamScore}
				{teamNum}
			/>
		{/key}
	</div>

	<section class="inputs">
		{#if challenge.privateNotes}
			<p>{challenge.privateNotes}</p>
		{/if}
		<form method="POST" action="?/saveProgress">
			<h2>Progress</h2>
			{#if challenge.type === 'single'}
				<input
					type="checkbox"
					name="progress"
					value="0"
					checked={progress?.progress?.[0] ?? false}
					on:change={() => changeCheckbox(0)}
				/>
				<code class="shortcut">[Q]</code>
				<input type="hidden" value={1} name="max" />
			{:else if challenge.type === 'multi'}
				<ol class="multiList" role="list">
					{#each challenge.partDescs as c, i}
						<li>
							<label>
								<input
									type="checkbox"
									name="progress"
									value={`${i}`}
									checked={progress?.progress?.[i] ?? false}
									on:change={() => changeCheckbox(i)}
								/>
								{#if i < entryShortcuts.length}
									<code class="shortcut">[{entryShortcuts.charAt(i).toUpperCase()}]</code>
								{/if}
								{c}</label
							>
						</li>
					{/each}
				</ol>
				<input type="hidden" value={challenge.partDescs.length} name="max" />
			{/if}

			{#if linkedChallenge}
				<h2>Linked Challenge: {linkedChallenge.title}</h2>
				{#if linkedChallenge.type === 'single'}
					<input
						type="checkbox"
						name="linkProgress"
						value="0"
						checked={challengeProgress[linkedChallenge.id]?.progress?.[0] ?? false}
						on:change={() => changeLinkedCheckbox(0)}
					/>
					<input type="hidden" value={1} name="linkMax" />
				{:else if linkedChallenge.type === 'multi'}
					<ol class="multiList" role="list">
						{#each linkedChallenge.partDescs as c, i}
							<li>
								<label>
									<input
										type="checkbox"
										name="linkProgress"
										value={`${i}`}
										checked={challengeProgress[linkedChallenge.id]?.progress?.[i] ?? false}
										on:change={() => changeLinkedCheckbox(i)}
									/>
									{c}</label
								>
							</li>
						{/each}
					</ol>
					<input type="hidden" value={linkedChallenge.partDescs.length} name="linkMax" />
				{/if}
				<input type="hidden" value={linkedChallengeJson} name="linkJson" />
			{/if}

			<h2>Overrides</h2>
			<p>
				<label>
					<input
						type="checkbox"
						name="failedProgress"
						value="true"
						checked={progress?.failed ?? false}
						on:change={() => changeFailed()}
					/>
					<code class="shortcut">[F]</code> Mark as Failed</label
				>
			</p>
			<p>
				Complete status:
				<select bind:value={progress.manualComplete} name="manualComplete">
					<option value={undefined}>No Override (DEFAULT)</option>
					<option value={true}>COMPLETE manual</option>
					<option value={false}>INCOMPLETE manual</option>
				</select>
				(<code class="shortcut">[A]</code> = none, <code class="shortcut">[S]</code> = complete,
				<code class="shortcut">[D]</code> = incomplete)
			</p>
			<input type="hidden" bind:value={teamId} name="teamId" />
			<input type="hidden" bind:value={challenge.id} name="challengeId" />
			<input type="hidden" bind:value={challengeJson} name="challengeJson" />

			{#if challenge.bonus}
				<h2>Bonus</h2>
				<p>
					<input
						type="checkbox"
						name="bonusProgress"
						value="true"
						checked={progress?.bonus ?? false}
						on:change={() => changeBonus()}
					/>
					<code class="shortcut">[B]</code>
				</p>
			{/if}

			<button type="submit" bind:this={submitRef}>Commit Changes (for this task only)</button>
			<code class="shortcut">[Z]</code>
		</form>
	</section>
{/if}

<style>
	button {
		padding: 1em 2em;
	}

	.inputs {
		padding: 1em 2em;
	}

	select {
		padding: 1em 2em;
	}

	input[type='checkbox'] {
		width: 50px;
		height: 50px;
	}

	.secWrap {
		margin: 30px auto;
		width: calc(100% - 50px);
	}

	section {
		background: #ecf0f1;
		box-sizing: border-box;
		margin: 30px auto;
		width: calc(100% - 50px);
		border-radius: 20px;
		box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);

		overflow-y: auto;
	}

	h2 {
		font-size: 24px;
	}

	section :global(.sep) {
		display: block;
	}
	section :global(.sep)::before {
		content: '— ';
	}
	section :global(.sep)::after {
		content: ' —';
	}

	.multiList {
		list-style: none;
		padding: 0;
	}

	section :global(a) {
		color: black;
	}
	section :global(a):hover,
	section :global(a):focus {
		text-decoration: none;
	}
	section :global(a):active {
		text-decoration: underline;
	}

	label {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
	}

	@media (min-width: 1000px) {
		section,
		.secWrap {
			width: calc(50% - 60px);
			display: inline-block;
			vertical-align: top;
			margin: 25px;
		}
	}

	code.shortcut {
		padding: 0 0.2em;
		background: rgb(255, 255, 0);
		font-size: 16px;
	}
</style>
