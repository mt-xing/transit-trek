<script lang="ts">
	export let text: string;

	$: split = text.split('.');
	$: firstSentence = `${split[0]}.`;
	$: rest = text.substring(firstSentence.length).split('');
</script>

<span>
	{firstSentence}
	{#each rest as char, i}
		<span style="font-size: {((rest.length - i / 3) * 80) / rest.length}%">{char}</span>
	{/each}
</span>
