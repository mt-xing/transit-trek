<script lang="ts">
	import type { ChallengeDefinition } from '../types/challenge';
	import ImmutableCheckbox from './immutableCheckbox.svelte';
	import { isChallengeComplete, isChallengeUnlocked } from '../utils/challenge';
	import type { ChallengeProgress } from '../types/team';
	import type { GameState } from '../types/game';

	export let teamId: string;
	export let challenge: ChallengeDefinition;
	export let allChallenges: ChallengeDefinition[];
	export let challengeProgress: ChallengeProgress;
	export let gameState: GameState;

	$: progress = challengeProgress[challenge.id];

	$: dashboardInfo = {
		allChallenges,
		challengeProgress,
		gameState,
	};
	$: isUnlocked = isChallengeUnlocked(challenge, dashboardInfo);
	$: isComplete = isChallengeComplete(challenge, dashboardInfo);

	function changeCheckbox(index: number) {
		const current = progress.progress?.[index] ?? false;
		if (progress.progress === undefined) {
			progress.progress = [];
		}
		for (let i = progress.progress.length; i < index; i++) {
			progress.progress[i] = false;
		}
		progress.progress[index] = !current;

		dashboardInfo = {
			...dashboardInfo,
			challengeProgress: { ...challengeProgress, [challenge.id]: progress },
		};
	}
</script>

{#if progress}
	<section>
		<span
			class={`header ${isUnlocked ? 'unlocked ' : ''} ${isComplete ? 'complete' : 'incomplete'}`}
		>
			{#if isComplete}
				🎫
			{:else if !isUnlocked}
				🔒
			{:else}
				🔓
			{/if}
		</span>

		<div class="content">
			<h1>{challenge.title}</h1>

			{#if progress?.manualComplete !== undefined}
				<p class="msg">The status of this challenge has been overridden by Game Control.</p>
			{:else if progress?.manualUnlock === true}
				<p class="msg">This challenge has been manually unlocked by Game Control.</p>
			{:else if progress?.manualUnlock === false}
				<p class="msg">This challenge has been manually locked by Game Control.</p>
			{/if}

			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<p>{@html challenge.desc}</p>
			{#if challenge.rewardDesc}
				<h2>Reward</h2>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p>{@html challenge.rewardDesc}</p>
			{/if}
			{#if challenge.privateNotes}
				<h2>Scoring Notes</h2>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p>{@html challenge.privateNotes}</p>
			{/if}

			{#if progress?.manualComplete === true}
				<h2>Progress</h2>
				<p class="msg">
					<ImmutableCheckbox checked={true} />
					The challenge has been marked as complete by Game Control.
				</p>
			{:else if progress?.manualComplete === false}
				<h2>Progress</h2>
				<p class="msg">
					<ImmutableCheckbox checked={false} />
					This challenge has been marked as incomplete by Game Control.
				</p>
			{:else if !isUnlocked}
				<h2>Progress</h2>
				<p class="msg" style="font-weight: normal">You have not yet unlocked this challenge.</p>
			{/if}
		</div>
	</section>

	<section class="inputs">
		<form method="POST" action="?/saveProgress">
			<h2>Progress</h2>
			{#if !isUnlocked}
				<p class="msg">This team has not unlocked this challenge yet.</p>
			{/if}
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
			{:else if challenge.type === 'subtask'}
				<p><strong>THIS COMPONENT DOES NOT DISPLAY PARENT TASKS</strong></p>
			{/if}

			<h2>Overrides</h2>
			<p>
				Unlock status:
				<select bind:value={progress.manualUnlock} name="manualUnlock">
					<option value={undefined}>No Override (DEFAULT)</option>
					<option value={true}>UNLOCK manual</option>
					<option value={false}>LOCK manual</option>
				</select>
			</p>
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
			<input type="hidden" bind:value={challenge.mapPos} name="challengeMapPos" />
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

	section {
		background: #ecf0f1;
		box-sizing: border-box;
		margin: 30px auto;
		width: calc(100% - 50px);
		border-radius: 20px;
		box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);

		overflow-y: auto;
	}

	.content {
		overflow-y: auto;
		padding: 30px;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: center;

		--color: #95a5a6;
		background: var(--color);
		box-sizing: border-box;

		position: relative;
		font-size: 45px;
		width: 100%;
		left: 0;
		height: 100px;
		margin: 0;
	}

	.header.unlocked.incomplete {
		--color: #2980b9;
	}

	.header.complete {
		--color: #27ae60;
	}

	.closeBtn {
		position: absolute;
		top: 40px;
		left: 30px;
		background: none;
		border: none;
		cursor: pointer;
		font-weight: bold;
		color: black;

		background: rgba(255, 255, 255, 0.5);
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 15px;
	}

	h1 {
		font-size: 32px;
		margin-top: 0;
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

	.msg {
		background: #bdc3c7;
		padding: 1.5em 2em;
		font-weight: bold;
		border-radius: 1em;
	}

	label {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
	}

	@media (min-width: 1000px) {
		section {
			width: calc(50% - 60px);
			display: inline-block;
			vertical-align: top;
			margin: 25px;
		}
	}
</style>
