<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import {
		tt6ChallengeCategoryNames,
		type TT6PublicChallengeDefinition,
	} from '../../types/tt6/challenge';
	import ImmutableCheckbox from './tt6ImmutableCheckbox.svelte';
	import { isTt6ChallengeComplete } from '../../utils/tt6/challenge';
	import type { TT6ChallengeProgress } from '../../types/tt6/team';

	export let challenge: TT6PublicChallengeDefinition;
	export let challengeProgress: TT6ChallengeProgress;
	export let score: number;
	export let closeCallback: () => void;
	export let isFloat: boolean;

	$: progress = challengeProgress[challenge.id];

	$: isComplete = isTt6ChallengeComplete(challenge, challengeProgress);

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
	<div class="card">
		{#if isFloat}
			<button on:click={closeCallback} class="closeBtn" aria-label="Close"
				>╳ <span>Close</span></button
			>
		{/if}

		<div class="contentWrap">
			<span class="header">
				{#if isComplete}
					<span>✔</span>
				{/if}
			</span>

			<div class="content">
				<h1>{challenge.title}</h1>

				{#if progress?.manualComplete !== undefined}
					<p class="msg override">
						The status of this challenge has been overridden by Game Control.
					</p>
				{/if}

				{#if challenge.category === 'hard'}
					{#if score < 80}
						<p class="msg override" style="font-size: 1.2em; display: flex; flex-direction: row;">
							<span style="font-size: 3em; margin-right: 20px;">⚠️</span>
							<span
								>You may not <em style="text-decoration: underline;">begin</em> this challenge until
								your team has earned 80 points.</span
							>
						</p>
					{:else}
						<p class="msg hard">
							This challenge may only be attempted by teams with at least 80 points. You may begin
							this challenge if you so choose.
						</p>
					{/if}
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
					<span class="big">{tt6ChallengeCategoryNames[challenge.category]}</span>
					{#if challenge.category === 'find'}
						Within the game area, try to find where this is located. Once found, take a team selfie
						and let us know where you found it.
					{:else if challenge.category === 'challenge'}
						For this challenge, follow the instructions. If a selfie is requested, all team members
						must be visible unless explicitly stated otherwise.
					{:else if challenge.category === 'hard'}
						This is an end-game challenge. Your may not begin an attempt on this challenge until
						your team has earned 80 points.
					{/if}
				</p>

				<h2>Progress</h2>

				{#if progress?.manualComplete === true}
					<p class="msg override">
						<ImmutableCheckbox checked={true} />
						This challenge has been marked as complete by Game Control, regardless of the status shown
						below.
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
					<h3>Score Adjustments</h3>
					<p>Adjustment of {challenge.bonus} point{challenge.bonus === 1 ? '' : 's'}</p>
					<ImmutableCheckbox
						checked={progress?.bonus ?? false}
						text={progress?.bonus ?? false ? 'Active' : 'Inactive'}
					/>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	section {
		filter: url(#knockout-glow);
		display: block;

		width: calc(100% - 20px);
		max-width: 520px;
		box-sizing: border-box;
		padding: 0.5em 1em 1.75em 1em;

		margin: 0 auto;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 5;
	}

	.card {
		position: relative;
		display: inline-flex;
		flex-direction: column;
		background: none;
		text-align: center;
		border-radius: 1vh;
		margin: 1vh;
		overflow: hidden;

		color: white;
		font-size: 20px;

		--radius: 1em;
		--a: calc(var(--radius) / tan(67.5deg));
		--b: calc(var(--radius) / tan(67.5deg) / sqrt(2));
		--notch: 0.6em;
		--close: 5em;

		clip-path: shape(
			from var(--radius) 0,
			line to calc(var(--radius) + var(--close) - var(--a)) 0,
			arc to calc(var(--radius) + var(--close) + var(--b)) var(--b) of var(--radius) cw,
			line to calc(var(--radius) + var(--close) + 2 * var(--notch)) calc(2 * var(--notch)),
			arc to calc(var(--radius) + var(--close) + 2 * var(--notch) + var(--a))
				calc(2 * var(--notch) + var(--b)) of var(--radius) ccw,
			line to calc(100% - var(--radius)) calc(2 * var(--notch) + var(--b)),
			arc to 100% calc(2 * var(--notch) + var(--b) + var(--radius)) of var(--radius) cw,
			line to 100% calc(100% - var(--radius)),
			arc to calc(100% - var(--radius)) 100% of var(--radius) cw,
			line to calc(50% + var(--notch) + var(--a)) 100%,
			arc to calc(50% + var(--notch) - var(--b)) calc(100% - var(--b)) of var(--radius) cw,
			line to calc(50% - var(--notch) + var(--b)) calc(100% - 2 * var(--notch) + var(--b)),
			arc to calc(50% - var(--notch) - var(--a)) calc(100% - 2 * var(--notch)) of var(--radius) ccw,
			line to var(--radius) calc(100% - 2 * var(--notch)),
			arc to 0 calc(100% - 2 * var(--notch) - var(--radius)) of var(--radius) cw,
			line to 0 var(--radius),
			arc to var(--radius) 0 of var(--radius) cw,
			close
		);
	}

	.card::before {
		content: '';
		position: absolute;
		z-index: -1;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: linear-gradient(
			to top,
			rgba(4, 100, 176, 0.5),
			rgba(1, 47, 104, 0.7) 30%,
			rgba(2, 14, 34, 0.7)
		);
	}

	.contentWrap {
		max-height: calc(100vh - 60px);
		max-height: calc(100svh - 60px);

		overflow-y: auto;
	}

	section.inline {
		position: relative;
		max-width: initial;
		margin: 0 auto;
	}

	section.inline .contentWrap {
		max-height: unset;
	}

	section.challenge {
		--color: rgb(12, 60, 15);
		--accent-color: #3dae2b;
	}

	section.find {
		--color: #00a0df;
	}

	section.hard {
		--color: #8a2631;
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

	.closeBtn {
		position: absolute;
		top: 0;
		left: 0;
		border: none;
		cursor: pointer;
		font-weight: bold;
		color: white;

		height: 36px;
		font-size: 20px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: start;
		z-index: 5;
		background: none;
		padding-left: 1em;

		background: linear-gradient(to bottom, black 50%, rgba(0, 0, 0, 0));
	}

	.closeBtn span {
		padding-left: 0.7em;
	}

	h1 {
		font-size: 32px;
		margin-top: 0;
		margin-bottom: 1.2em;
		text-align: center;
		font-family: 'ClearSansBold', 'Arial', sans-serif;
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
		border-top: 2px solid var(--accent-color);
		background: linear-gradient(to bottom, var(--color) 30%, rgba(2, 14, 34, 0.7));
		--notch: 1.5em;
		clip-path: polygon(
			var(--notch) 0%,
			100% 0%,
			100% calc(100% - var(--notch)),
			calc(100% - var(--notch)) 100%,
			0% 100%,
			0% var(--notch)
		);
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
