<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<p>{JSON.stringify(data.challenges)}</p>

<ul>
{#each data.challenges as challenge}
<li><a href="/admin/challengeEdit?id={challenge.id}">{challenge.title}</a></li>
{/each}
</ul>