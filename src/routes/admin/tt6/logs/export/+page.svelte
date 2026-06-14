<script lang="ts">
	import { sortTt6Challenges } from '../../../../../types/tt6/challenge';
	import type { PageData } from './$types';

	export let data: PageData;

	const { rawChallenges, teams } = data;
	if (!rawChallenges || !teams) {
		throw new Error();
	}

	const challenges = sortTt6Challenges(rawChallenges);
</script>

<h1>Challenges</h1>

<textarea readonly>{JSON.stringify(challenges, null, 2)}</textarea>

<h1>Teams</h1>

<textarea readonly>{JSON.stringify(teams, null, 2)}</textarea>

<p><a href="/admin">Back</a></p>

<style>
	textarea {
		width: 400px;
		height: 500px;
	}
</style>
