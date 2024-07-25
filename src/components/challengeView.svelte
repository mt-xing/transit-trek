<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { TT3PublicChallengeDefinition } from '../types/challenge';
	import ImmutableCheckbox from './immutableCheckbox.svelte';
	import { isChallengeComplete, isChallengeUnlocked } from '../utils/challenge';
	import type { TT3DashboardPassthroughInfo } from '../types/map';

	export let challenge: TT3PublicChallengeDefinition;
	export let dashboardInfo: TT3DashboardPassthroughInfo;
	$: ({ allChallenges, challengeProgress } = dashboardInfo);
	export let iteration: number = 0;
	export let closeCallback: () => void;

	let openChallenge: TT3PublicChallengeDefinition | undefined;
	$: progress = challengeProgress[challenge.id];

	$: isUnlocked = isChallengeUnlocked(challenge, dashboardInfo);
	$: isComplete = isChallengeComplete(challenge, dashboardInfo);
</script>

<section
	style={openChallenge !== undefined ? 'filter: blur(3px); pointer-events: none;' : ''}
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

	<div
		style="max-height: calc(100vh - {220 + iteration * 40}px);max-height: calc(100svh - {220 +
			iteration * 40}px);"
		class="content"
	>
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
				This challenge has been marked as complete by Game Control, regardless of the status shown below.
			</p>
		{:else if progress?.manualComplete === false}
			<p class="msg">
				<ImmutableCheckbox checked={false} />
				This challenge has been marked as incomplete by Game Control, regardless of the status shown
				below.
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
							checked={isChallengeComplete(c, dashboardInfo)}
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
	</div>
</section>

{#if openChallenge}
	<svelte:self
		{dashboardInfo}
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
		margin: 30px auto;
		width: calc(100% - 50px);
		max-width: 500px;
		border-radius: 20px;
		box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);

		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;

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
</style>
