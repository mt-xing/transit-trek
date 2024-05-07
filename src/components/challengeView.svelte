<script lang="ts">
	import type { PublicChallengeDefinition } from '../types/challenge';
	import ImmutableCheckbox from './immutableCheckbox.svelte';

	export let challenge: PublicChallengeDefinition;
	export let allChallenges: PublicChallengeDefinition[];
</script>

<section>
	<h1>{challenge.title}</h1>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<p>{@html challenge.desc}</p>
	{#if challenge.rewardDesc}
		<h2>Reward</h2>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p>{@html challenge.rewardDesc}</p>
	{/if}
	<h2>Progress</h2>
	{#if challenge.type === 'single'}
		<ImmutableCheckbox checked={true} />
	{:else if challenge.type === 'multi'}
		<ol class="multiList" role="list">
			{#each challenge.partDescs as c}
				<li><ImmutableCheckbox checked={false} text={c} /></li>
			{/each}
		</ol>
	{:else if challenge.type === 'subtask'}
		<p>Complete {challenge.subtaskInfo.minRequired} of the following:</p>
		<ul class="multiList" role="list">
			{#each allChallenges.filter((x) => x.mapPos === challenge.subtaskInfo.mapPos) as c}
				<li>
					<ImmutableCheckbox checked={false} text={c.title} callback={() => {}} />
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	section {
		background: #ecf0f1;
		box-sizing: border-box;
		margin: 50px auto;
		width: calc(100% - 50px);
		max-width: 500px;
		padding: 50px 30px;
		border-radius: 50px;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
	}

	h1 {
		font-size: 32px;
		margin-top: 0;
	}

	h2 {
		font-size: 24px;
	}

	:global(.sep) {
		display: block;
	}
	:global(.sep)::before {
		content: '— ';
	}
	:global(.sep)::after {
		content: ' —';
	}

	.multiList {
		list-style: none;
		padding: 0;
	}
</style>
