<script>
	import { onMount } from 'svelte';

	onMount(() => {
		if (location.host.indexOf("localhost") !== 0) {
			document.location.replace("/tt2/index.html");
		} else {
			document.location.replace("/oldHome");
		}
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Seattle Transit Trek" />
</svelte:head>

<div></div>

<style>
	div {
        background: black;
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
    }
</style>
