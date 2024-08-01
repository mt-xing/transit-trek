<script lang="ts">
	import { fly } from 'svelte/transition';
	import {
		tt4ChallengeCategoryNames,
		type TT4PublicChallengeDefinition,
	} from '../../types/tt4/challenge';
	import ImmutableCheckbox from './tt4ImmutableCheckbox.svelte';
	import { isTt4ChallengeComplete } from '../../utils/tt4/challenge';
	import type { TT4ChallengeProgress } from '../../types/tt4/team';

	export let challenge: TT4PublicChallengeDefinition;
	export let challengeProgress: TT4ChallengeProgress;
	export let closeCallback: () => void;
	export let isFloat: boolean;

	$: progress = challengeProgress[challenge.id];

	$: isComplete = isTt4ChallengeComplete(challenge, challengeProgress);
</script>

<section
	transition:fly={isFloat ? { y: 200 } : { duration: 0 }}
	class={`${challenge.category} ${isComplete ? 'complete' : 'incomplete'} ${isFloat ? '' : 'inline'}`}
>
	<span class="header">
		{#if isComplete}
			✅
		{:else if challenge.category === 'selfie'}
			📷
		{:else if challenge.category === 'experience'}
			🎫
		{:else if challenge.category === 'distraction'}
			🔮
		{:else}
			🔓
		{/if}
	</span>

	<div class="content">
		<h1>{challenge.title}</h1>
		{#if isFloat}
			<button on:click={closeCallback} class="closeBtn" aria-label="Close">╳</button>
		{/if}

		{#if progress?.manualComplete !== undefined}
			<p class="msg override">The status of this challenge has been overridden by Game Control.</p>
		{/if}

		<p class={`msg ${challenge.category}`}>
			{challenge.points} point{challenge.points === 1 ? '' : 's'}
		</p>

		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p>{@html challenge.desc}</p>

		<p class={`msg ${challenge.category}`}>
			<span class="big">{tt4ChallengeCategoryNames[challenge.category]}</span>
			{#if challenge.category === 'selfie'}
				For this challenge, you must submit a team selfie with all team members visible.
			{:else if challenge.category === 'experience'}
				For this challenge, go to the indicated location and follow the instructions. If a selfie is
				requested, all team members must be visible unless explicitly stated otherwise.
			{:else if challenge.category === 'distraction'}
				Much like the D&Ds in RuneScape, this is a side quest that can be done at any point. If a
				selfie is requested, all team members must be visible unless explicitly stated otherwise.
			{/if}
		</p>

		<h2>Progress</h2>

		{#if progress?.manualComplete === true}
			<p class="msg override">
				<ImmutableCheckbox checked={true} />
				This challenge has been marked as complete by Game Control, regardless of the status shown below.
			</p>
		{:else if progress?.manualComplete === false}
			<p class="msg override">
				<ImmutableCheckbox checked={false} />
				This challenge has been marked as incomplete by Game Control, regardless of the status shown
				below.
			</p>
		{/if}

		{#if challenge.type === 'single'}
			<ImmutableCheckbox checked={progress?.progress?.[0] ?? false} />
		{:else if challenge.type === 'multi'}
			<ol class="multiList" role="list">
				{#each challenge.partDescs as c, i}
					<li><ImmutableCheckbox checked={progress?.progress?.[i] ?? false} text={c} /></li>
				{/each}
			</ol>
		{/if}
	</div>
</section>

<style>
	section {
		background: rgba(0, 0, 0, 0.5);
		color: white;
		backdrop-filter: blur(20px);
		box-sizing: border-box;
		margin: 30px auto;
		width: calc(100% - 50px);
		max-width: 500px;
		box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);

		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;

		overflow-y: auto;
	}

	section.inline {
		position: relative;
		max-width: initial;
		margin: 0 auto;
	}

	section.selfie {
		box-shadow: 0 0 20px 5px rgba(241, 196, 15, 0.25);
		background: radial-gradient(
			farthest-corner at 0 0,
			rgba(241, 196, 15, 0.15),
			rgba(0, 0, 0, 0.5) 50%
		);
	}

	section.selfie .header {
		background: radial-gradient(farthest-corner at 0 0, rgba(241, 196, 15, 0.2), rgba(0, 0, 0, 0));
	}

	.msg.selfie {
		--color: rgba(241, 196, 15, 1);
	}

	section.experience {
		box-shadow: 0 0 20px 5px rgba(39, 174, 96, 0.25);
		background: radial-gradient(
			farthest-corner at 0 0,
			rgba(39, 174, 96, 0.15),
			rgba(0, 0, 0, 0.5) 50%
		);
	}

	section.experience .header {
		background: radial-gradient(farthest-corner at 0 0, rgba(39, 174, 96, 0.2), rgba(0, 0, 0, 0));
	}

	.msg.experience {
		--color: rgba(39, 174, 96, 1);
	}

	section.distraction {
		box-shadow: 0 0 20px 5px rgba(41, 128, 185, 0.25);
		background: radial-gradient(
			farthest-corner at 0 0,
			rgba(41, 128, 185, 0.15),
			rgba(0, 0, 0, 0.5) 50%
		);
	}

	section.distraction .header {
		background: radial-gradient(farthest-corner at 0 0, rgba(41, 128, 185, 0.2), rgba(0, 0, 0, 0));
	}

	.msg.distraction {
		--color: rgba(41, 128, 185, 1);
	}

	.content {
		overflow-y: auto;
		padding: 30px;
		max-height: calc(100vh - 220px);
		max-height: calc(100svh - 220px);
	}

	section.inline .content {
		max-height: initial;
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

	section.complete {
		box-shadow: 0 0 25px 5px rgba(255, 255, 255, 0.5);
	}

	section.complete .header {
		background: radial-gradient(farthest-corner at 0 0, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0));

		font-weight: bold;
		text-shadow: 0 0 15px white;
	}

	.closeBtn {
		position: absolute;
		top: 40px;
		right: 30px;
		background: none;
		border: none;
		cursor: pointer;
		font-weight: bold;
		color: white;

		background: rgba(0, 0, 0, 0.5);
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

	section :global(img) {
		max-width: 100%;
	}

	.multiList {
		list-style: none;
		padding: 0;
	}

	section :global(a) {
		color: white;
	}
	section :global(a):hover,
	section :global(a):focus {
		text-decoration: none;
	}
	section :global(a):active {
		text-decoration: underline;
	}

	.msg {
		background: black;
		--color: white;
		border-left: 2px var(--color) solid;
		padding: 1em 1.5em;
		margin: 20px 0;
	}

	.msg .big {
		display: block;
		font-size: 1.05em;
		font-weight: bold;
		margin-bottom: 0.2em;
	}

	.msg.override {
		font-weight: bold;
		box-shadow: 0 0 20px 0 rgba(255, 255, 255, 1);
		padding: 1.5em 2em;
		border: none;
		margin: 30px 0;
	}
</style>
