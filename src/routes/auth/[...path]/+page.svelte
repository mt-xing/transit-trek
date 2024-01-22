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
	<button on:click={() => signIn('google')}> Sign In with Google </button>
</p>
