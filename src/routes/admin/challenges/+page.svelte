<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { challenges } = data;
	challenges.sort((a, b) => a.mapPos - b.mapPos);
</script>

<p>{JSON.stringify(challenges)}</p>

<ul>
	{#each challenges as challenge}
		<li>
			<a href="/admin/challengeEdit?id={challenge.id}">{challenge.mapPos}: {challenge.title}</a>
		</li>
	{/each}
</ul>

<form method="POST" action="?/newChallenge">
	<button type="submit">Create New Challenge</button>
</form>
