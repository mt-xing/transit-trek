<script lang="ts">
	import { onMount } from 'svelte';
	import TopLogo from '../../components/topLogo.svelte';
	import bg_clean from '$lib/images/tt4/bg_clean.png';
	import shards_clean from '$lib/images/tt4/shards_clean.png';
	import text_clean from '$lib/images/tt4/text_clean_2.png';
	import eye_clean from '$lib/images/tt4/eye.gif';

	let mouseX = 0.5;
	let mouseY = 0.5;

	let loaded = false;
	onMount(() => {
		loaded = true;
	});

	function handleMousemove(event: MouseEvent) {
		mouseX = event.clientX / window.innerWidth;
		mouseY = event.clientY / window.innerHeight;
	}

	const firstParallax = 0.01;

	$: firstParallaxLeft = loaded ? `${mouseX * window.innerWidth * -firstParallax}px` : '';
	$: firstParallaxTop = loaded ? `${mouseY * window.innerHeight * -firstParallax}px` : '';

	const secondParallax = 0.005;

	$: secondParallaxLeft = loaded ? `${mouseX * window.innerWidth * -secondParallax}px` : '';
	$: secondParallaxTop = loaded ? `${mouseY * window.innerHeight * -secondParallax}px` : '';
</script>

<svelte:head>
	<title>Transit Trek: Hide and Seek</title>
	<meta name="description" content="Seattle Transit Trek's August 2024 event, Hide and Seek" />
</svelte:head>

<TopLogo />

<div class="bodyBg"></div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section class="hero" on:mousemove={handleMousemove}>
	<img
		src={bg_clean}
		alt=""
		class="bg"
		style="
            transform:scale({1 + firstParallax});
            left: {firstParallaxLeft};
            top: {firstParallaxTop};"
	/>
	<img
		src={shards_clean}
		alt=""
		class="shards"
		style="
            transform:scale({1 + secondParallax});
            left: {secondParallaxLeft};
            top: {secondParallaxTop};"
	/>
	<div class="gradient"></div>
	<img class="text" src={text_clean} alt="" />
	<div class="eyeWrap"><img src={eye_clean} alt="" /></div>
	<h1>Hide & Seek</h1>
	<h2 class="date">August 3, 2024</h2>
</section>

<p style="margin: 200px 0; color: white; text-align: center; font-size: 30px;">More Details TBA</p>

<style>
	.hero {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero > img,
	.hero > div {
		position: absolute;
		pointer-events: none;
	}

	.hero > img {
		object-fit: cover;
		object-position: center;

		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;

		transform-origin: top left;
	}

	.hero .text {
		object-fit: contain;
		object-position: center center;
	}

	.hero .gradient {
		opacity: 0.4;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom right, #ffc800, #8300fe);
		mix-blend-mode: multiply;
	}

	.hero h1 {
		font-size: 12vw;
		color: white;
		font-family: 'Segoe UI', 'Arial', sans-serif;
		font-weight: 900;
	}

	.hero h2 {
		position: absolute;
		z-index: 2;

		bottom: min(10vw, 10vh);
		color: white;

		font-weight: 900;
		font-size: 50px;
		text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
		-webkit-text-stroke: 5px black;
		paint-order: stroke fill;
		text-align: center;
	}

	.hero .eyeWrap {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, calc(min(1vw, 1.8vh) - 50%));
		z-index: 2;
		opacity: 0.8;
		pointer-events: none;
	}

	.hero .eyeWrap img {
		max-width: min(10vw, 18vh);
	}

	.bodyBg {
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #0e0a1a;
	}
</style>
