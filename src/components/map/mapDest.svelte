<script lang="ts">
	export let title: string;
</script>

<div>
	<span>{title}</span>
</div>

<style>
	div {
		width: 30px;
		height: 30px;
		background: white;
		border: black 4px solid;
		border-radius: 30px;
		box-sizing: border-box;
		position: relative;

		z-index: 2;
	}

	span {
		position: absolute;
		left: 150%;
		display: flex;
		top: 0;
		bottom: 0;
		min-width: 100px;
		flex-direction: column;
		justify-content: center;
	}
</style>
