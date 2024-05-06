<script lang="ts">
	import ChallengeView from '../../../components/challengeView.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { challenge, allChallenges } = data;
</script>

{#if challenge}
	<ChallengeView {challenge} {allChallenges} />
{/if}
