<script lang="ts">
	import { onMount } from 'svelte';
	import { isEtt1ChallengeComplete } from '../../../../../utils/ett1/challenge';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams, challenges } = data;
	teams.sort((a, b) => a.teamNum - b.teamNum);

	let isRefresh = false;

	onMount(() => {
		if (window.location.search === '?refresh') {
			isRefresh = true;
			setTimeout(() => {
				// eslint-disable-next-line no-restricted-globals
				location.reload();
			}, 10 * 1000);
		}
	});
</script>

<h1>Heatmap</h1>

{#if isRefresh}
	<p>Auto refresh every 10 seconds enabled.</p>
{:else}
	<p>
		This page does <strong>NOT</strong> auto-update. Refresh for new data. Click
		<a href="?refresh" rel="external">here</a> to auto-refresh.
	</p>
{/if}

<table>
	<tr>
		<th style="max-width: 200px;">Team Name</th>
		{#each challenges as challenge}
			<td class="challengeName">{challenge.title}</td>
		{/each}
	</tr>
	{#each teams as team}
		<tr>
			<th style="max-width: 200px;line-break: anywhere;">
				{team.teamNum}: {team.name} ({team.score} pts)

				{#if !team.bioBreakTaken}
					❌ bio
				{/if}
			</th>
			{#each challenges as challenge}
				<td>
					{#if isEtt1ChallengeComplete(challenge, team.challengeProgress)}
						✅
					{:else if team.challengeProgress[challenge.id]?.progress?.some((x) => !!x)}
						🚸
					{/if}
				</td>
			{/each}
		</tr>
	{/each}
</table>

<p><a href="/admin">Back</a></p>

<style>
	table {
		border-collapse: collapse;
	}

	td,
	th {
		border: 1px black solid;
	}

	th {
		min-width: 200px;
	}

	.challengeName {
		line-break: anywhere;
		width: 3vw;
		font-size: 12px;
	}
</style>
