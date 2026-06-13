<script lang="ts">
	import {
		iterateTt6Categories,
		sortTt6Challenges,
		tt6ChallengeCategoryNames,
	} from '../../../../types/tt6/challenge';
	import type { PageData } from './$types';

	export let data: PageData;

	const rawChallenges = data.challenges;
	const challenges = sortTt6Challenges(rawChallenges);
</script>

<h1>Challenges</h1>

{#each iterateTt6Categories(challenges) as category}
	<h2>{tt6ChallengeCategoryNames[category]}</h2>
	{#each challenges[category] as challenge}
		<li>
			<a href="/admin/tt6/challenges/edit?id={challenge.id}"
				>{category}: {challenge.shrinkTitle ? challenge.title.split('.')[0] : challenge.title}</a
			>
			(<a href="/admin/tt6/challenges/preview?id={challenge.id}">Preview</a>)
		</li>
	{/each}
{/each}

<form method="POST" action="?/newChallenge">
	<input type="hidden" value="unknown" name="unknown" />
	<button type="submit">Create New Challenge</button>
</form>

<p><a href="/admin/tt6/challenges/print">Print Preview</a></p>
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
