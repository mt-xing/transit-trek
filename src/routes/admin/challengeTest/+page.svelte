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
			'3b914c8f-e728-41d5-a142-b27f19aba575': [true],
			'843bbbb0-3ab1-417a-a1b4-a69bb06ec7af': [true, true, true],
		}}
	/>
{/if}
