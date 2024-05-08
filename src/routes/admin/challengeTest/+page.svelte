<script lang="ts">
	import ChallengeView from '../../../components/challengeView.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { challenge, allChallenges } = data;
</script>

{#if challenge}
	<ChallengeView
		{challenge}
		{allChallenges}
		closeCallback={() => {
			window.location.href = '/admin/challenges';
		}}
		allChallengeProgress={{
			'b2afe19c-d245-4461-89e2-d373371e354a': { progress: [true] },
			'a84efa50-22d3-4ff9-860f-c4f010756fdc': { progress: [true], manualUnlock: true },
			'3b914c8f-e728-41d5-a142-b27f19aba575': { progress: [true] },
			'843bbbb0-3ab1-417a-a1b4-a69bb06ec7af': { progress: [true, true, true] },
			'08e2fc05-fca2-4f35-90ca-94e959d6571f': {
				progress: [true, true],
				manualUnlock: true,
				manualComplete: false,
			},
		}}
	/>
{/if}
