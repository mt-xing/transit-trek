<script lang="ts">
	import ChallengeView from '../../../components/challengeView.svelte';
	import Map from '../../../components/map/map.svelte';
	import type { PublicChallengeDefinition } from '../../../types/challenge';
	import type { PageData } from './$types';

	export let data: PageData;
	const { allChallenges } = data;
	const challengeProgress = {
		'b2afe19c-d245-4461-89e2-d373371e354a': { progress: [true] },
		'a84efa50-22d3-4ff9-860f-c4f010756fdc': { progress: [true], manualUnlock: true },
		'3b914c8f-e728-41d5-a142-b27f19aba575': { progress: [true] },
		'843bbbb0-3ab1-417a-a1b4-a69bb06ec7af': { progress: [true, true, true] },
		'08e2fc05-fca2-4f35-90ca-94e959d6571f': {
			progress: [true, true],
			manualUnlock: true,
			manualComplete: false,
		},
		'6aed52ef-df4f-4bba-9fac-8aed85ce04b2': {
			manualUnlock: true,
			progress: undefined,
		},
	};

	let selectedChallenge: null | PublicChallengeDefinition = null;
</script>

{#if allChallenges}
	<div>
		<Map
			{allChallenges}
			{challengeProgress}
			openCallback={(c) => {
				if (selectedChallenge === null) {
					selectedChallenge = c;
				}
			}}
		/>
	</div>
{/if}

{#if selectedChallenge !== null}
	<ChallengeView
		challenge={selectedChallenge}
		{allChallenges}
		allChallengeProgress={challengeProgress}
		closeCallback={() => {
			selectedChallenge = null;
		}}
	/>
{/if}
