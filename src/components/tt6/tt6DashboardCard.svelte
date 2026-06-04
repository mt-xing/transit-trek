<script lang="ts">
	export let color: 'blue' | 'red' | 'green' | 'purple' | 'black' | 'white' = 'blue';
	export let small: boolean = false;

	import Tt6Card from './tt6Card.svelte';
</script>

<div class={`tt6DashCard${small ? ' small' : ''}`}>
	<Tt6Card fillWidth={true} animate={false} {color} reducedPadding={small}>
		<slot />
	</Tt6Card>
</div>

<style>
	.tt6DashCard {
		max-width: 500px;
		width: calc(100% - 50px);
		margin: 2em auto;
	}

	.tt6DashCard.small {
		max-width: 400px;
		width: calc(100% - 150px);
	}
</style>
