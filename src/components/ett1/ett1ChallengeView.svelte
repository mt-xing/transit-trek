<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import {
		ett1ChallengeCategoryNames,
		type ETT1PublicChallengeDefinition,
	} from '../../types/ett1/challenge';
	import ImmutableCheckbox from './ett1ImmutableCheckbox.svelte';
	import { isEtt1ChallengeComplete } from '../../utils/ett1/challenge';
	import type { ETT1ChallengeProgress } from '../../types/ett1/team';

	export let challenge: ETT1PublicChallengeDefinition;
	export let challengeProgress: ETT1ChallengeProgress;
	export let closeCallback: () => void;
	export let isFloat: boolean;

	$: progress = challengeProgress[challenge.id];

	$: isComplete = isEtt1ChallengeComplete(challenge, challengeProgress);

	let imgLoaded: undefined | boolean;
	let descWrap: HTMLParagraphElement;
	onMount(() => {
		const allImgs = descWrap.getElementsByTagName('IMG');
		if (allImgs.length > 0) {
			imgLoaded = false;
		}
		const loadImg = () => {
			imgLoaded = true;
		};
		// eslint-disable-next-line no-restricted-syntax
		for (const el of allImgs) {
			if ((el as HTMLImageElement).complete) {
				imgLoaded = true;
			} else {
				el.addEventListener('load', loadImg);
			}
		}
	});
</script>

<section
	transition:fly={isFloat ? { y: 200, x: 0 } : { duration: 0 }}
	class={`${challenge.category} ${isComplete ? 'complete' : 'incomplete'} ${isFloat ? '' : 'inline'}`}
>
	{#if isFloat}
		<button on:click={closeCallback} class="closeBtn" aria-label="Close">╳</button>
	{/if}

	<span class="header">
		{#if isComplete}
			<span>✔</span>
		{/if}
	</span>

	<div class="content">
		<h1>{challenge.title}</h1>

		{#if progress?.manualComplete !== undefined}
			<p class="msg override">The status of this challenge has been overridden by Game Control.</p>
		{/if}

		<p class={`msg ${challenge.category}`}>
			{challenge.points} point{challenge.points === 1 ? '' : 's'}
		</p>

		<img
			style="max-width: 60px;{imgLoaded !== false ? 'display: none' : ''}"
			src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif"
			alt=""
		/>

		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p bind:this={descWrap}>{@html challenge.desc}</p>

		<p class={`msg ${challenge.category}`}>
			<span class="big">{ett1ChallengeCategoryNames[challenge.category]}</span>
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

		{#if challenge.bonus}
			<h3>Bonus</h3>
			<p>Additional {challenge.bonus} point{challenge.bonus === 1 ? '' : 's'}</p>
			<ImmutableCheckbox checked={progress?.bonus ?? false} />
		{/if}
	</div>
</section>

<style>
	section {
		background-color: rgb(250, 250, 250);
		color: black;
		box-sizing: border-box;
		margin: 30px auto;
		width: calc(100% - 20px);
		max-height: calc(100vh - 60px);
		max-height: calc(100svh - 60px);
		max-width: 520px;
		box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
		border-bottom: 5px black solid;

		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 5;

		overflow-y: auto;
	}

	section.inline {
		position: relative;
		max-width: initial;
		margin: 0 auto;
	}

	section.challenge {
		--color: rgba(39, 174, 96, 1);
		background: rgb(250, 250, 250);
	}

	section.find {
		--color: rgba(41, 128, 185, 1);
		background: rgb(250, 250, 255);
	}

	.content {
		padding: 0 30px 30px 30px;
	}

	section.inline .content {
		max-height: initial;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: center;

		box-sizing: border-box;

		position: relative;
		font-size: 45px;
		width: 100%;
		left: 0;
		height: 85px;
		margin: 0;
	}

	.header::before {
		content: '';
		display: block;
		height: 16px;
		width: 100%;
		background: var(--color);
		position: absolute;

		top: 42px;
		left: 0;
	}

	.header::after {
		content: '';
		display: block;
		height: 55px;
		width: 55px;
		border: 7px black solid;
		background: white;
		position: absolute;
		border-radius: 40px;
		top: 22.5px;
		box-sizing: border-box;
	}

	.complete .header::after {
		background: black;
	}

	.complete .header span {
		position: relative;
		z-index: 5;
		color: white;
		font-weight: 900;
		top: 6px;
	}

	.closeBtn {
		position: absolute;
		top: 0;
		left: 0;
		border: none;
		cursor: pointer;
		font-weight: bold;
		color: white;

		background: black;
		width: 36px;
		height: 36px;
		font-size: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 5;
	}

	h1 {
		font-size: 32px;
		margin-top: 0;
		margin-bottom: 1.2em;
		text-align: center;
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
		/* border: 2px var(--color) solid;
		border-left: 6px var(--color) solid; */
		background: rgb(240, 240, 240);
		border-bottom: 5px var(--color) solid;
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
		border: 2px black solid;
		padding: 1.5em 2em;
		margin: 30px 0;
	}
</style>
