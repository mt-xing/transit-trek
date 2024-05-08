<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PublicChallengeDefinition } from '../types/challenge';
	import ImmutableCheckbox from './immutableCheckbox.svelte';
	import type { ChallengeProgress } from '../types/team';
	import { isChallengeComplete } from '../utils/challenge';

	export let challenge: PublicChallengeDefinition;
	export let allChallenges: PublicChallengeDefinition[];
	export let allChallengeProgress: ChallengeProgress;
	export let iteration: number = 0;
	export let closeCallback: () => void;

	let openChallenge: PublicChallengeDefinition | undefined;
	const progress = allChallengeProgress[challenge.id];
</script>

<section style="margin-top: {50 + iteration * 40}px" transition:fly={{ y: 200 }}>
	<h1>{challenge.title}</h1>
	<button on:click={closeCallback} class="closeBtn" aria-label="Close">╳</button>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<p>{@html challenge.desc}</p>
	{#if challenge.rewardDesc}
		<h2>Reward</h2>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p>{@html challenge.rewardDesc}</p>
	{/if}
	<h2>Progress</h2>
	{#if challenge.type === 'single'}
		<ImmutableCheckbox checked={progress?.[0] ?? false} />
	{:else if challenge.type === 'multi'}
		<ol class="multiList" role="list">
			{#each challenge.partDescs as c, i}
				<li><ImmutableCheckbox checked={progress?.[i] ?? false} text={c} /></li>
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
							openChallenge = c;
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

		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.closeBtn {
		position: absolute;
		top: 60px;
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
</style>
