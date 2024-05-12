<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { gameState } = data;
	if (!gameState) {
		throw new Error();
	}
	const ogStartTime = gameState.t !== 'pre' ? gameState.startTime : 0;

	let resetString = '';
</script>

{#if gameState.t === 'pre'}
	<h1>Game State: 🛑 Not started</h1>

	<form method="POST" action="?/startGame">
		<input type="hidden" value="unknown" name="unknown" />
		<button type="submit">Start Game</button>
	</form>
{:else if gameState.t === 'ongoing'}
	<h1>Game State: 🟢🏃‍♂️ Ongoing</h1>
	<p>Start Time: {new Date(ogStartTime)}</p>

	<form method="POST" action="?/endGame">
		<input type="hidden" value="unknown" name="unknown" />
		<button type="submit">End Game</button>
	</form>
{:else if gameState.t === 'post'}
	<h1>Game State: ✅ Complete</h1>
	<p>Start Time: {new Date(ogStartTime)}</p>

	<form method="POST" action="?/resumeGame">
		<input type="hidden" value="unknown" name="unknown" />
		<button type="submit">Resume Game</button>
	</form>
{/if}

{#if gameState.t !== 'pre'}
	<form method="POST" action="?/changeTime">
		<h2>Start Time</h2>
		<input type="number" bind:value={gameState.startTime} name="startTime" />
		<p>Preview: {new Date(gameState.startTime)}</p>
		<button type="submit">Change Start Time</button>
	</form>
{/if}

<p><a href="/admin">Back</a></p>

<form action="?/resetDanger" method="POST">
	<h2>Danger Zone</h2>
	<p>Type <code>reset</code> below to reset the game state to "Not started"</p>
	<p><input type="text" bind:value={resetString} maxlength="5" name="sanityString" /></p>
	<p>
		<button disabled={resetString !== 'reset'}>RESET</button>
	</p>
</form>

<style>
	button {
		padding: 0.5em 1em;
	}
</style>
