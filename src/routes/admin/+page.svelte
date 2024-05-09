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

<h2>Challenges</h2>
<p><a href="/admin/challenges">Edit Challenges</a></p>
<p><a href="/admin/mapTest">Map Preview</a></p>
