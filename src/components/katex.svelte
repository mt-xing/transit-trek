<script lang="ts">
	import katex from 'katex';
	import 'katex/dist/katex.min.css';

	export let math;
	export let displayMode = false;

	const options = {
		displayMode,
		throwOnError: false,
	};

	$: katexString = katex.renderToString(math, options);
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html katexString}
