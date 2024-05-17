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

<h2>Setup</h2>
<p><a href="/admin/challenges">Edit Challenges</a></p>
<p><a href="/admin/teams">Edit Teams</a></p>

<h2>Game Operations</h2>
<p><a href="/admin/game">Game State</a></p>
<p><a href="/admin/finish">Team Finishes</a></p>
<p><a href="/admin/entry">Challenge Status Entry</a></p>
<p><a href="/admin/logs">Logs</a></p>

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
