<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { logs } = data;
	if (!logs) {
		throw new Error();
	}

	let resetString = '';
	const { log } = logs;
</script>

<h1>Logs</h1>

<textarea readonly>{JSON.stringify(log, null, 2)}</textarea>

<p><a href="/admin">Back</a></p>

<form action="?/resetDanger" method="POST">
	<h2>Danger Zone</h2>
	<p>Type <code>reset</code> below to delete all logs.</p>
	<p><input type="text" bind:value={resetString} maxlength="5" name="sanityString" /></p>
	<p>
		<button disabled={resetString !== 'reset'}>RESET</button>
	</p>
</form>

<style>
	button {
		padding: 0.5em 1em;
	}

	textarea {
		width: 400px;
		height: 500px;
	}
</style>
