<script lang="ts">
	export let text: string;
	export let href: string;
	export let color: string[] = ['#e6400e', '#9366b3', '#0596cf'];
	export let external: boolean = false;
	export let isBlock: boolean = false;
	export let isBlack: boolean = false;
	export let customStyles: string = '';

	$: finalColor = `linear-gradient(to right, ${color.map((x, i, a) => `${x} ${(i / Math.max(a.length - 1, 1)) * 50}%`).join(', ')}, rgba(0, 0, 255, 0) 100%)`;
</script>

<a
	{href}
	class="bigbtn{isBlack ? ' black' : ''}"
	style="--color: {finalColor}{isBlock ? ';display: block;' : ''};{customStyles}"
	rel={external ? 'external' : undefined}>{text}</a
>

<style>
	.bigbtn {
		position: relative;
		z-index: 2;

		padding: 20px 60px;
		display: inline-block;
		color: white;
		text-decoration: none;
		position: relative;
		overflow: hidden;
		text-shadow: 0 0 15px black;
		-webkit-text-stroke: 2px black;
		paint-order: stroke fill;
		font-weight: bold;
		font-size: 25px;
		box-shadow: 0 0 1px 1px white;

		transition: box-shadow 0.5s ease-in-out;
	}

	.bigbtn.black {
		box-shadow: 0 0 1px 1px black;
	}

	.bigbtn:hover,
	.bigbtn:focus {
		box-shadow: 0 0 20px 0px white;
	}

	.bigbtn:active {
		transition: box-shadow 0.1s ease-in-out;
		box-shadow: 0 0 20px 0px black;
	}

	.bigbtn::after {
		content: '➤';
		margin-left: 1em;
		display: inline-block;
		transform: translateX(0);
		transition: transform 0.25s ease-in-out;
	}

	.bigbtn:hover::after,
	.bigbtn:focus::after {
		transform: translateX(1em);
	}

	.bigbtn::before {
		content: '';
		display: block;
		position: absolute;
		z-index: -1;
		background: var(--color);
		top: 0;
		left: 0;
		width: 200%;
		height: 100%;
		transform: translateX(-100%);
		transition: transform 0.5s ease-in-out;
	}

	.bigbtn:hover::before,
	.bigbtn:focus::before {
		transform: translateX(0);
	}
</style>
