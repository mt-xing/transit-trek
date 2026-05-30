<script lang="ts">
	import Tt6ChallengeView from '../../../../../components/tt6/tt6ChallengeView.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { challenge } = data;
</script>

<svg width="0" height="0" style="position: absolute;">
	<filter id="knockout-glow">
		<feComponentTransfer in="SourceAlpha" result="solid-alpha">
			<feFuncA type="linear" slope="100" />
		</feComponentTransfer>
		<feGaussianBlur in="solid-alpha" stdDeviation="8" result="glow-blur" />
		<feFlood flood-color="#ffffff" result="glow-color" />
		<feComposite in="glow-color" in2="glow-blur" operator="in" result="colored-glow" />
		<feComposite in="colored-glow" in2="solid-alpha" operator="out" result="glow-outside-only" />
		<feMerge>
			<feMergeNode in="glow-outside-only" />
			<feMergeNode in="SourceGraphic" />
		</feMerge>
	</filter>
</svg>

<div id="wrap">
	{#if challenge}
		<Tt6ChallengeView
			{challenge}
			closeCallback={() => {
				// eslint-disable-next-line no-restricted-globals
				location.href = '/admin/tt6/challenges';
			}}
			challengeProgress={{
				'5f36ac75-ab5a-43d1-a59b-c8f683f4bfc0': { progress: [], manualComplete: true },
				'5c5ea111-c3d4-4e76-89f4-34bf81205fc8': { progress: [true, true, true] },
			}}
			isFloat={true}
			score={0}
		/>
	{/if}
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	#wrap {
		width: 100%;
		min-height: 100svh;
		background: radial-gradient(farthest-corner at 0 0, #150f37, black);
	}
</style>
