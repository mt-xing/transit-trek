<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Transit Trek: Error</title>
</svelte:head>

<h1>{$page.status}: {$page?.error?.message ?? 'Something bad happened :('}</h1>

{#if $page.status === 401}
	<div class="card">
		<p>This team URL is not valid.</p>
		<p>
			If this used to be your team's link, it may have been changed. Contact Game Control for help.
		</p>
	</div>
{:else}
	<div class="card">
		<p>Something went wrong.</p>
		<p>Contact Game Control for help.</p>
	</div>
{/if}

<style>
	h1,
	p {
		text-align: center;
		padding: 0 10px;
	}

	h1 {
		background: #2c3e50;
		color: white;
		margin-top: 0;
		padding: 50px 20px 160px 20px;
		box-sizing: border-box;
		width: 100%;
		text-shadow: 0 0 15px black;
		font-size: 40px;
		margin-bottom: -140px;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background: #ecf0f1;
	}

	.card {
		background: white;
		max-width: 500px;
		width: calc(100% - 50px);
		margin: 20px auto;
		padding: 20px 10px;
		box-sizing: border-box;
		border-radius: 15px;
		box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.2);
		overflow-x: hidden;
	}
</style>
