<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { allChallenges } = data;
</script>

<table>
	<tr>
		<th>Challenge</th>
		<th>Points</th>
	</tr>
	{#each allChallenges as challenge}
		<tr>
			<td>
				<strong>{challenge.category}: {challenge.title}</strong><br />
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p>{@html challenge.desc}</p>
			</td>
			<td>
				{challenge.points}
			</td>
		</tr>
	{/each}
</table>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	table {
		border-collapse: collapse;
	}

	td,
	th {
		border: 1px black solid;
	}

	td:first-child {
		width: 80vw;
		max-width: 1000px;
	}

	td:last-child {
		text-align: center;
		vertical-align: top;
	}

	:global(img) {
		max-width: 100%;
		max-height: 500px;
	}

	:global(p) {
		margin: 0.2em 0;
	}
</style>
