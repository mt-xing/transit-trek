<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { gameState } = data;
	if (!gameState) {
		throw new Error();
	}

	let resetString = '';
</script>

{#if gameState.t === 'pre' && !gameState.countdown}
	<h1>Game State: 🛑 Not started</h1>

	<form method="POST" action="?/countdown">
		<input type="hidden" value="unknown" name="unknown" />
		<button type="submit">Countdown to Start</button>
	</form>
{:else if gameState.t === 'pre' && gameState.countdown}
	<h1>Game State: ⚠️ Countdown</h1>

	<form method="POST" action="?/startGame">
		<input type="hidden" value="unknown" name="unknown" />
		<button type="submit">Start Game</button>
	</form>
{:else if gameState.t === 'ongoing'}
	<h1>Game State: 🟢🏃‍♂️ Ongoing</h1>
	<h2>Catch Enabled: {gameState.catchEnabled ? '✅ YES' : '🛑 NO'}</h2>

	{#if gameState.catchEnabled}
		<form method="POST" action="?/disableCatch">
			<input type="hidden" value="unknown" name="unknown" />
			<button type="submit">Disable Catch</button>
		</form>
	{:else}
		<form method="POST" action="?/enableCatch">
			<input type="hidden" value="unknown" name="unknown" />
			<button type="submit">Enable Catch</button>
		</form>
	{/if}

	<form
		method="POST"
		action="?/endGame"
		style="border-top: 1px black solid; margin-top: 100px; padding-top: 20px;"
	>
		<input type="hidden" value="unknown" name="unknown" />
		<button type="submit">End Game</button>
	</form>
{:else if gameState.t === 'post'}
	<h1>Game State: ✅ Complete</h1>

	<form method="POST" action="?/resumeGame">
		<input type="hidden" value="unknown" name="unknown" />
		<button type="submit">Resume Game</button>
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
