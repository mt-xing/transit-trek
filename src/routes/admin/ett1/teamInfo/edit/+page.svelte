<script lang="ts">
	import { getColor } from '../../../../../utils/ett1/colors';
	import type { PageData } from './$types';

	export let data: PageData;
	const { team } = data;

	if (!team) {
		throw new Error();
	}

	let { name } = team;
	const { teamNum, id } = team;

	let scoreAdjust = 0;
</script>

<h1>
	Edit Team Info: <span class="colorBadge" style="--color: {getColor(team.teamNum)};"></span>
	<em>Team {teamNum} - {name || 'Untitled Team'}</em>
</h1>

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

<a href="/admin/ett1/teamInfo" style="display: block; margin-top: 100px;">Discard and Return</a>

<style>
	.colorBadge {
		display: inline-block;
		height: 1em;
		width: 1em;
		background: var(--color);
	}
</style>
