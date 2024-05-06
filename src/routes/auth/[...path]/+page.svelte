<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let data;

	if (browser && $page.data.session?.user) {
		goto(`/admin/${data.path}`);
	}
</script>

<h1>Super Secret Admin Login</h1>
<p>No doubters* allowed.</p>
<p><small>*Doubters := Arjun</small></p>
<p>
	<button on:click={() => signIn('google')}>
		<img src="/google_btn.svg" alt="Sign in with Google" />
	</button>
</p>

<style>
	button {
		cursor: pointer;
		padding: 0;
		border: none;
		background: none;
		box-shadow: 0 0 10px;
		border-radius: 15px;
		overflow: hidden;

		transition: box-shadow 0.2s ease-in-out;
	}

	button:hover,
	button:focus {
		box-shadow: 0 0 25px;
	}

	button:active {
		box-shadow: 0 0 5px;
		transition: box-shadow 0.05s ease-out;
	}
</style>
