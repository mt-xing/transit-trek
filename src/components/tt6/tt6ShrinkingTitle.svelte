<script lang="ts">
	export let text: string;

	$: split = text.split('.');
	$: firstSentence = `${split[0]}.`;
	$: rest = text.substring(firstSentence.length).split('');
</script>

<span class="shrink">
	<span>{firstSentence}</span>
	{#each rest as char, i}
		<span style="font-size: {((rest.length - i / 2) * 80) / rest.length}%">{char}</span>
	{/each}
</span>

<style>
	.shrink {
		display: inline-block;
		line-height: 0;
	}

	.shrink span {
		line-height: 1.2;
		vertical-align: baseline;
	}
</style>
