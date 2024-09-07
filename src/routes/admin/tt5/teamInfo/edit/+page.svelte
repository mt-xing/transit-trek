<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { team } = data;

	if (!team) {
		throw new Error();
	}

	let { name } = team;
	const { teamNum, id, catchTimes } = team;

	let catchTimesString = catchTimes.join(',');

	let scoreAdjust = 0;
</script>

<h1>Edit Team Info: <em>Team {teamNum} - {name || 'Untitled Team'}</em></h1>

<form method="POST" action="?/teamName">
	<h2>Team Name</h2>
	<input type="hidden" value={id} name="id" />
	<input type="text" bind:value={name} name="teamName" />
	<button type="submit">Update Name</button>
</form>

<h2>Bio Break</h2>
{#if team.bioBreakTaken}
	<form method="POST" action="?/undoBio">
		✅
		<input type="hidden" value={id} name="id" />
		<button type="submit">Delete bio break</button>
	</form>
{:else}
	<form method="POST" action="?/bio">
		🛑
		<input type="hidden" value={id} name="id" />
		<button type="submit">Complete bio break</button>
	</form>
{/if}

<form method="POST" action="?/scoreAdjust">
	<h2>Score</h2>
	<input type="hidden" value={id} name="id" />
	<p>Current Score: {team.score}</p>
	<p>Apply manual adjustment:</p>
	<p>+<input type="number" bind:value={scoreAdjust} name="scoreAdjust" /> points</p>
	<button type="submit">Apply to score</button>
</form>

<form method="POST" action="?/catchAdjust">
	<h2>Catch Times</h2>
	<input type="hidden" value={id} name="id" />
	<textarea bind:value={catchTimesString} name="catchTimes"></textarea>
	{#if !catchTimesString}
		<p>No catches</p>
	{:else}
		<p>Preview:</p>
		<ul>
			{#each catchTimesString.split(',') as catchTimeRaw}
				<li>{new Date(parseInt(catchTimeRaw, 10))}</li>
			{/each}
		</ul>
	{/if}
	<button type="submit">Manual Update</button>
</form>

<a href="/admin/tt5/teamInfo" style="display: block; margin-top: 100px;">Discard and Return</a>

<style>
	textarea {
		min-width: 400px;
		min-height: 3em;
	}
</style>
