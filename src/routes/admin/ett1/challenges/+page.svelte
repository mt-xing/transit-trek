<script lang="ts">
	import {
		iterateEtt1Categories,
		sortEtt1Challenges,
		ett1ChallengeCategoryNames,
	} from '../../../../types/ett1/challenge';
	import type { PageData } from './$types';

	export let data: PageData;

	const rawChallenges = data.challenges;
	const challenges = sortEtt1Challenges(rawChallenges);
</script>

<h1>Challenges</h1>

{#each iterateEtt1Categories(challenges) as category}
	<h2>{ett1ChallengeCategoryNames[category]}</h2>
	{#each challenges[category] as challenge}
		<li>
			<a href="/admin/ett1/challenges/edit?id={challenge.id}">{category}: {challenge.title}</a>
			(<a href="/admin/ett1/challenges/preview?id={challenge.id}">Preview</a>)
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
