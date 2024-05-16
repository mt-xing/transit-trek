<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { challenges } = data;
	challenges.sort((a, b) => a.mapPos - b.mapPos);
</script>

<h1>Challenges</h1>

<ul>
	{#each challenges as challenge}
		<li>
			<a href="/admin/challenges/edit?id={challenge.id}">{challenge.mapPos}: {challenge.title}</a>
		</li>
	{/each}
</ul>

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
