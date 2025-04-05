<script lang="ts">
	import type { ETT1ChallengeDefinition } from '../../types/ett1/challenge';
	import type { ETT1ChallengeProgress } from '../../types/ett1/team';
	import Ett1ChallengeView from './ett1ChallengeView.svelte';

	export let teamId: string;
	export let challenge: ETT1ChallengeDefinition;
	export let challengeProgress: ETT1ChallengeProgress;

	$: progress = challengeProgress[challenge.id];

	$: challengeJson = JSON.stringify(challenge);

	function changeCheckbox(index: number) {
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

	function changeBonus() {
		if (progress.bonus) {
			progress.bonus = false;
		} else {
			progress.bonus = true;
		}

		challengeProgress = { ...challengeProgress, [challenge.id]: progress };
	}
</script>

{#if progress}
	<div class="secWrap" style="background: white;">
		{#key challenge.id}
			<Ett1ChallengeView isFloat={false} {challengeProgress} {challenge} closeCallback={() => {}} />
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
								{c}</label
							>
						</li>
					{/each}
				</ol>
				<input type="hidden" value={challenge.partDescs.length} name="max" />
			{/if}

			<h2>Overrides</h2>
			<p>
				Complete status:
				<select bind:value={progress.manualComplete} name="manualComplete">
					<option value={undefined}>No Override (DEFAULT)</option>
					<option value={true}>COMPLETE manual</option>
					<option value={false}>INCOMPLETE manual</option>
				</select>
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
				</p>
			{/if}

			<button type="submit">Commit Changes (for this task only)</button>
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
</style>
