<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<p>{JSON.stringify(data.challenges)}</p>
