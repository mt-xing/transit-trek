<script lang="ts">
	import { fly } from 'svelte/transition';
	import {
		tt5ChallengeCategoryNames,
		type TT5PublicChallengeDefinition,
	} from '../../types/tt5/challenge';
	import ImmutableCheckbox from './tt5ImmutableCheckbox.svelte';
	import { isTt5ChallengeComplete } from '../../utils/tt5/challenge';
	import type { TT5ChallengeProgress } from '../../types/tt5/team';
	import Tt5ShrinkingTitle from './tt5ShrinkingTitle.svelte';

	export let challenge: TT5PublicChallengeDefinition;
	export let challengeProgress: TT5ChallengeProgress;
	export let closeCallback: () => void;
	export let isFloat: boolean;

	$: progress = challengeProgress[challenge.id];

	$: isComplete = isTt5ChallengeComplete(challenge, challengeProgress);
</script>

<section
	transition:fly={isFloat ? { y: 200, x: -20 } : { duration: 0 }}
	class={`${challenge.category} ${isComplete ? 'complete' : 'incomplete'} ${isFloat ? '' : 'inline'}`}
>
	<span class="header">
		{#if isComplete}
			✅
		{:else if challenge.category === 'find'}
			📷
		{:else if challenge.category === 'challenge'}
			🎫
		{:else}
			🔓
		{/if}
	</span>

	<div class="content">
		<h1>
			{#if challenge.shrinkTitle}
				<Tt5ShrinkingTitle text={challenge.title} />
			{:else}
				{challenge.title}
			{/if}
		</h1>
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
			<span class="big">{tt5ChallengeCategoryNames[challenge.category]}</span>
			{#if challenge.category === 'find'}
				Within the game area, try to find where this is located. Once found, take a team selfie and
				let us know where you found it.
			{:else if challenge.category === 'challenge'}
				For this challenge, follow the instructions. If a selfie is requested, all team members must
				be visible unless explicitly stated otherwise.
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
		background: url($lib/images/tt5/paper.png);
		background-size: 100% auto;
		background-position: center top;
		background-repeat: repeat-y;
		color: black;
		box-sizing: border-box;
		margin: 30px auto;
		width: calc(100% - 20px);
		max-width: 520px;
		box-shadow: -5px 5px 10px 2px rgba(0, 0, 0, 0.3);

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

	section.challenge .header {
		background: rgba(39, 174, 96, 1);
	}

	.msg.challenge {
		--color: rgba(39, 174, 96, 1);
	}

	section.find .header {
		background: rgb(41, 128, 185);
	}

	.msg.find {
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
		box-shadow: 0 0 25px 10px rgba(255, 255, 255, 0.5);
	}

	section.complete .header {
		font-weight: bold;
		text-shadow: 0 0 30px white;
	}

	.closeBtn {
		position: absolute;
		top: 40px;
		left: 30px;
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
		--color: white;
		border: 2px var(--color) solid;
		border-left: 6px var(--color) solid;
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
