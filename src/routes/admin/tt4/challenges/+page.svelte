<script lang="ts">
	import {
		iterateTt4Categories,
		sortTt4Challenges,
		tt4ChallengeCategoryNames,
	} from '../../../../types/tt4/challenge';
	import type { PageData } from './$types';

	export let data: PageData;

	const rawChallenges = data.challenges;
	const challenges = sortTt4Challenges(rawChallenges);
</script>

<h1>Challenges</h1>

{#each iterateTt4Categories(challenges) as category}
	<h2>{tt4ChallengeCategoryNames[category]}</h2>
	{#each challenges[category] as challenge}
		<li>
			<a href="/admin/tt4/challenges/edit?id={challenge.id}">{category}: {challenge.title}</a>
			(<a href="/admin/tt4/challenges/preview?id={challenge.id}">Preview</a>)
		</li>
	{/each}
{/each}

<form method="POST" action="?/newChallenge">
	<input type="hidden" value="unknown" name="unknown" />
	<button type="submit">Create New Challenge</button>
</form>

<p><a href="/admin">Back</a></p>

<style>
	li {
		font-size: 20px;
		margin: 0.5em 0;
	}

	button {
		padding: 0.5em 1em;
	}
</style>
