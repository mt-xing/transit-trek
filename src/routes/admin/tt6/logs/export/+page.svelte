<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { challenges, teams } = data;
	if (!challenges || !teams) {
		throw new Error();
	}
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
