<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<h1>Super Secret Admin Page</h1>
<p>
	{#if $page.data.session}
		<span>
			<small>Signed in as</small><br />
			<strong>{$page.data.session.user?.name ?? 'User'}</strong>
		</span>
		<button on:click={() => signOut()} class="button">Sign out</button>
	{/if}
</p>

<h1>ETT1</h1>

<h2>Setup</h2>
<p><a href="/admin/ett1/challenges">Edit Challenges</a></p>
<p><a href="/admin/ett1/teams">Edit Teams</a></p>

<h2>Game Operations</h2>
<p><a href="/admin/ett1/game">Game State</a></p>
<p><a href="/admin/ett1/entry">Challenge Status Entry</a></p>
<p><a href="/admin/ett1/teamInfo">Team Info</a></p>
<p><a href="/admin/ett1/logs">Logs</a></p>

<h2>Progress Overview</h2>
<p><a href="/admin/ett1/summary/standings">Standings</a></p>
<p><a href="/admin/ett1/summary/heatmap">Heat Map</a></p>

<h2>Old Events</h2>
<p><a href="/admin/tt3">TT3</a></p>
<p><a href="/admin/tt4">TT4</a></p>

<style>
	h1,
	h2,
	p {
		margin-left: 20px;
		margin-right: 20px;
	}

	a {
		padding: 1em 2em;
		border: 1px black solid;
		display: inline-block;
		margin: 0 20px;
	}
</style>
