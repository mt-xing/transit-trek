<script lang="ts">
	import { isTt4ChallengeComplete } from '../../../../../utils/tt4/challenge';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams, challenges } = data;
	teams.sort((a, b) => a.teamNum - b.teamNum);
</script>

<h1>Heatmap</h1>

<p>This page does <strong>NOT</strong> auto-update. Refresh for new data.</p>

<table>
	<tr>
		<th>Team Name</th>
		{#each challenges as challenge}
			<td>{challenge.title}</td>
		{/each}
	</tr>
	{#each teams as team}
		<tr>
			<th>{team.teamNum}: {team.name} ({team.score} pts)</th>
			{#each challenges as challenge}
				<td>{isTt4ChallengeComplete(challenge, team.challengeProgress) ? '✅' : ''}</td>
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
</style>
