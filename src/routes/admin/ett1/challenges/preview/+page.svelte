<script lang="ts">
	import Ett1ChallengeView from '../../../../../components/ett1/ett1ChallengeView.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { challenge } = data;
</script>

<div id="wrap">
	{#if challenge}
		<Ett1ChallengeView
			{challenge}
			closeCallback={() => {
				// eslint-disable-next-line no-restricted-globals
				location.href = '/admin/ett1/challenges';
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
