<script lang="ts">
	import { getColor } from '../../../../utils/ett1/colors';
	import type { PageData } from './$types';

	export let data: PageData;

	const { teams } = data;
	teams.sort((a, b) => a.teamNum - b.teamNum);
</script>

<h1>Teams</h1>

<ul>
	{#each teams as team}
		<li>
			<a href="/admin/ett1/teamInfo/edit?id={team.id}">
				<span class="colorBadge" style="--color: {getColor(team.teamNum)};"></span>
				{team.teamNum}: {team.name}
			</a>
		</li>
	{/each}
</ul>

<p><a href="/admin">Back</a></p>

<style>
	li {
		font-size: 20px;
		margin: 0.5em 0;
	}
	.colorBadge {
		display: inline-block;
		height: 1em;
		width: 1em;
		background: var(--color);
	}
</style>
