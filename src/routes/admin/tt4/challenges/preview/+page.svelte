<script lang="ts">
	import Tt4ChallengeView from '../../../../../components/tt4/tt4ChallengeView.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { challenge } = data;
</script>

<div id="wrap">
	{#if challenge}
		<Tt4ChallengeView
			{challenge}
			closeCallback={() => {
				// eslint-disable-next-line no-restricted-globals
				location.href = '/admin/tt4/challenges';
			}}
			challengeProgress={{
				'5f36ac75-ab5a-43d1-a59b-c8f683f4bfc0': { progress: [], manualComplete: true },
			}}
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
