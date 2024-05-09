<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PublicChallengeDefinition } from '../types/challenge';
	import ImmutableCheckbox from './immutableCheckbox.svelte';
	import type { ChallengeProgress } from '../types/team';
	import { isChallengeComplete, isChallengeUnlocked } from '../utils/challenge';

	export let challenge: PublicChallengeDefinition;
	export let allChallenges: PublicChallengeDefinition[];
	export let allChallengeProgress: ChallengeProgress;
	export let iteration: number = 0;
	export let closeCallback: () => void;

	let openChallenge: PublicChallengeDefinition | undefined;
	const progress = allChallengeProgress[challenge.id];

	const isUnlocked = isChallengeUnlocked(challenge, allChallenges, allChallengeProgress);
	const isComplete = isChallengeComplete(challenge, allChallenges, allChallengeProgress);
</script>

<section
	style="margin-top: {50 + iteration * 40}px; max-height: calc(100vh - {80 +
		iteration * 40}px); {openChallenge !== undefined
		? 'filter: blur(3px); pointer-events: none;'
		: ''}"
	transition:fly={{ y: 200 }}
>
	<span class={`header ${isUnlocked ? 'unlocked ' : ''} ${isComplete ? 'complete' : 'incomplete'}`}>
		{#if isComplete}
			🎫
		{:else if !isUnlocked}
			🔒
		{:else}
			🔓
		{/if}
	</span>

	<h1>{challenge.title}</h1>
	<button on:click={closeCallback} class="closeBtn" aria-label="Close">╳</button>

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
	<h2>Progress</h2>

	{#if progress?.manualComplete === true}
		<p class="msg">
			<ImmutableCheckbox checked={true} />
			The challenge has been marked as complete by Game Control, regardless of the status shown below.
		</p>
	{:else if progress?.manualComplete === false}
		<p class="msg">
			<ImmutableCheckbox checked={false} />
			This challenge has been marked as incomplete by Game Control, regardless of the status shown below.
		</p>
	{:else if !isUnlocked}
		<p class="msg" style="font-weight: normal">You have not yet unlocked this challenge.</p>
	{/if}

	{#if challenge.type === 'single'}
		<ImmutableCheckbox checked={progress?.progress?.[0] ?? false} />
	{:else if challenge.type === 'multi'}
		<ol class="multiList" role="list">
			{#each challenge.partDescs as c, i}
				<li><ImmutableCheckbox checked={progress?.progress?.[i] ?? false} text={c} /></li>
			{/each}
		</ol>
	{:else if challenge.type === 'subtask'}
		<p>Complete {challenge.subtaskInfo.minRequired} of the following:</p>
		<ul class="multiList" role="list">
			{#each allChallenges.filter((x) => x.mapPos === challenge.subtaskInfo.mapPos) as c}
				<li>
					<ImmutableCheckbox
						checked={isChallengeComplete(c, allChallenges, allChallengeProgress)}
						text={c.title}
						callback={() => {
							if (openChallenge === undefined) {
								openChallenge = c;
							}
						}}
					/>
				</li>
			{/each}
		</ul>
	{/if}
</section>

{#if openChallenge}
	<svelte:self
		{allChallenges}
		{allChallengeProgress}
		challenge={openChallenge}
		iteration={iteration + 1}
		closeCallback={() => {
			openChallenge = undefined;
		}}
	/>
{/if}

<style>
	section {
		background: #ecf0f1;
		box-sizing: border-box;
		margin: 50px auto;
		width: calc(100% - 50px);
		max-width: 500px;
		padding: 50px 30px;
		border-radius: 50px;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

		position: fixed;
		top: 0;
		left: 0;
		right: 0;

		max-height: calc(100vh - 200px);
		overflow-y: auto;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: center;

		--color: #95a5a6;

		position: relative;
		font-size: 45px;
		width: 70px;
		height: 70px;
		border-radius: 70px;
		border: var(--color) solid 10px;
		margin: -20px auto 20px auto;
	}

	.header.unlocked.incomplete {
		--color: #2980b9;
	}

	.header.complete {
		--color: #27ae60;
		color: white;
		background: var(--color);
		font-weight: bold;
	}

	.header::before,
	.header::after {
		content: '';
		display: block;
		background: var(--color);
		width: 140px;
		max-width: calc(50vw - 110px);
		position: absolute;
		right: calc(100% + 30px);
		height: 30px;
	}

	.header::after {
		right: unset;
		left: calc(100% + 30px);
	}

	.closeBtn {
		position: absolute;
		top: 150px;
		left: 30px;
		background: none;
		border: none;
		cursor: pointer;
	}

	h1 {
		font-size: 32px;
		margin-top: 0;
		padding-left: 35px;
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
</style>
