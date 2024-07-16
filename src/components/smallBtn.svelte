<script lang="ts">
	export let text: string;
	export let href: string;
</script>

<a {href} class="smallBtn">{text}</a>

<style>
	.smallBtn {
		position: relative;
		z-index: 2;

		color: white;
		text-decoration: none;
		text-shadow: 0 0 15px black;
		font-weight: bold;
		font-size: 20px;

		white-space: nowrap;
	}

	.smallBtn::after {
		content: '➤';
		margin-left: 0.5em;
		display: inline-block;
		transform: translateX(0);
		transition: transform 0.25s ease-in-out;
	}

	.smallBtn:hover::after,
	.smallBtn:focus::after {
		transform: translateX(0.5em);
	}

	.smallBtn:active::after {
		transform: translateX(0);
		transition: transform 0.1s ease-in-out;
	}
</style>
