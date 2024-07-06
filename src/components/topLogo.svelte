<script lang="ts">
	import ttLogo from '$lib/images/tt-logo-blank.png';
	import { HOME_PAGE } from '../utils/paths';
</script>

<a href={HOME_PAGE} class="topLogo"><img src={ttLogo} alt="" /> Seattle Transit Trek</a>

<style>
	.topLogo {
		text-decoration: none;
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		color: rgba(255, 255, 255, 0.85);
		font-weight: 900;
		font-size: 50px;
		text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
		-webkit-text-stroke: 2px black;
		paint-order: stroke fill;

		top: 5vh;
		left: 0;
		right: 0;

		z-index: 5;
	}

	.topLogo img {
		width: 100px;
		margin-right: 20px;
		opacity: 0.9;
		box-shadow: 10px 10px 5px 0 rgba(0, 0, 0, 0.5);
	}

	@media (max-width: 1000px) {
		.topLogo {
			font-size: 5vw;
			-webkit-text-stroke: 0.2vw black;
		}

		.topLogo img {
			width: 10vw;
			margin-right: 2vw;
		}
	}
</style>
