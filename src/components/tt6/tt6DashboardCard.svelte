<script lang="ts">
	import Tt6Card from './tt6Card.svelte';
</script>

<div class="tt6DashCard">
	<Tt6Card fillWidth={true} animate={false}>
		<slot />
	</Tt6Card>
</div>

<style>
	.tt6DashCard {
		max-width: 500px;
		width: calc(100% - 50px);
		margin: 2em auto;
	}
</style>
