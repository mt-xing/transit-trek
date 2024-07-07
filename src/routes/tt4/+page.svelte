<script lang="ts">
	import { onMount } from 'svelte';
	import TopLogo from '../../components/topLogo.svelte';
	import bg_clean from '$lib/images/tt4/bg_clean.png';
	import shards_clean from '$lib/images/tt4/shards_clean.png';
	import text_clean from '$lib/images/tt4/text_clean_2.png';
	import eye_vid_webm from '$lib/images/tt4/test.webm';
	import shard1 from '$lib/images/tt4/shard_1.png';
	import shard2 from '$lib/images/tt4/shard_2.png';
	import shard3 from '$lib/images/tt4/shard_3.png';

	import bg1 from '$lib/images/tt4/bg_shards/bg_1.png';
	import bg2 from '$lib/images/tt4/bg_shards/bg_2.png';
	import bg3 from '$lib/images/tt4/bg_shards/bg_3.png';
	import bg4 from '$lib/images/tt4/bg_shards/bg_4.png';

	const shardImgs = [bg1, bg2, bg3, bg4];

	let mouseX = 0.5;
	let mouseY = 0.5;

	let scrollY: number;
	let innerHeight: number;

	let shardInfo: { x: number; y: number; rot: number; size: number; big: boolean }[] = [];

	let loaded = false;

	let parallaxY: number;
	$: parallaxY = loaded ? scrollY / (document.documentElement.scrollHeight - innerHeight) : 0;

	onMount(() => {
		loaded = true;
		const maxHeight =
			((document.body.scrollHeight - window.innerHeight * 1.2) / window.innerHeight) * 100;

		[
			{ x: 12, y: 25, rot: 20, size: 1, big: true },
			{ x: 72, y: 80, rot: -20, size: 1, big: true },
			{ x: 5, y: 145, rot: 60, size: 1, big: true },
			{ x: 75, y: 180, rot: -60, size: 1, big: true },
		].forEach((s, i, a) => {
			shardInfo.push({ ...s, y: (maxHeight * (i + 0.5)) / a.length });
		});

		for (let i = 0; i < 10; i++) {
			const x = Math.random() * 80;
			const y = Math.random() * maxHeight;
			const rot = Math.random() * 360;
			const size = Math.random() * 0.2 + 0.1;
			shardInfo.push({ x, y, rot, size, big: false });
		}
		shardInfo = shardInfo;
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

	$: bigShardParallaxY = (parallaxY - 0.5) * 0.15 * innerHeight;
</script>

<svelte:head>
	<title>Transit Trek: Hide and Seek</title>
	<meta name="description" content="Seattle Transit Trek's August 2024 event, Hide and Seek" />
</svelte:head>

<svelte:window bind:scrollY bind:innerHeight on:mousemove={handleMousemove} />

<TopLogo />

<div class="bodyBg"></div>

<section class="hero">
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
	<video width="200" height="200" class="eyeWrap" autoplay muted playsinline>
		<!-- <source 
		  src="https://rotato.netlify.app/alpha-demo/movie-hevc.mov" 
		  type='video/mp4; codecs="hvc1"'> -->
		<source src={eye_vid_webm} type="video/webm" />
	</video>
	<h1>Hide & Seek</h1>
	<h2 class="date">August 3, 2024</h2>
</section>

<div class="postHero"></div>

{#each shardInfo as shard, i}
	<img
		src={shardImgs[i % shardImgs.length]}
		alt=""
		class="bgShard {shard.big ? 'big' : 'small'}"
		style="transform: translate({shard.x}vw, calc({shard.y}vh + {(parallaxY - 0.5) *
			(shard.big ? 0.3 : 0.5) *
			innerHeight}px)) rotate({shard.rot}deg) scale({shard.size});"
	/>
{/each}

<section class="right">
	<img
		src={shard1}
		alt=""
		style="transform: translateY({bigShardParallaxY}px)rotate({(parallaxY - 0.5) * 0.1}rad);"
	/>
	<div>
		<h2>It's Senior Skip Day!</h2>
		<p>
			You and your friends are trying to have a fun-packed day in Seattle. Unfortunately, your
			school's Dean of Students is suspicious of you calling in sick, and if they catch you with
			your friends, your day will be ruined. Even worse, they'll be in Seattle tracking you down.
		</p>
	</div>
</section>

<section class="left long">
	<img
		src={shard3}
		alt=""
		style="transform: translateY({bigShardParallaxY}px)rotate({(parallaxY - 0.5) * -0.05}rad);"
	/>
	<div>
		<h2>See the City</h2>
		<p>
			Your goal is to do as many fun things on your agenda (“tasks”) as possible without being
			spotted by the Dean of Students. Take transit! Explore the city! Get to all of the touristy
			sights without the help of a car.
		</p>
	</div>
</section>

<section class="right">
	<img
		src={shard2}
		alt=""
		style="transform: translateY({bigShardParallaxY}px)rotate({(parallaxY - 0.5) * 0.15}rad);"
	/>
	<div>
		<h2>Don't Get Caught</h2>
		<p>
			In the past, the Dean of Students only would have dealt with you had you been caught. But this
			year, they find your 9 absences so suspicious that they will actively sabotage your day.
			They've forced your best friend to share their location, and worst of all, they’ll be actively
			monitoring it this time.
		</p>
	</div>
</section>

<p style="margin: 200px 0; color: white; text-align: center; font-size: 30px;">More Details TBA</p>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
		overflow-x: hidden;
	}

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
		max-width: min(10vw, 18vh);
	}

	.bodyBg {
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: radial-gradient(farthest-corner at 0 0, #150f37, #0e0a1a);
	}

	.postHero {
		position: absolute;
		z-index: 1;
		top: 90vh;
		left: 0;
		right: 0;
		height: 20vh;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #0e0a1a, rgba(0, 0, 0, 0));
	}

	section.right,
	section.left {
		color: white;
		font-size: 1.2em;

		width: 80%;
		margin: 100px auto;
		max-width: 1200px;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	section.right > div,
	section.left > div {
		width: 60%;
		position: relative;
		z-index: 2;
	}

	section.right img,
	section.left img {
		max-width: 30%;
		opacity: 0.8;
	}

	section.right {
		flex-direction: row-reverse;
	}

	section.right div {
		margin-right: 10%;
	}

	section.left {
		flex-direction: row;
	}

	section.left div {
		margin-left: 10%;
	}

	section.long > div {
		width: 40%;
	}

	section.long img {
		max-width: 50%;
	}

	section.right h2,
	section.left h2 {
		text-shadow:
			0 0 20px purple,
			20px 0 20px purple,
			-20px 0 20px purple,
			0 10px 20px purple,
			0 -10px 20px purple;
	}

	.bgShard {
		position: absolute;
		width: max(20vw, 200px);
		top: 100vh;
		left: 0;
		z-index: 1;
		pointer-events: none;
	}

	.bgShard.big {
		opacity: 0.7;
		filter: blur(5px) brightness(0.7);
	}

	.bgShard.small {
		filter: brightness(0.7);
		opacity: 0.5;
	}

	@media (max-width: 700px) {
		section.left,
		section.right {
			flex-direction: column-reverse;
		}

		section.left > div,
		section.right > div {
			width: 100%;
			margin: 0 0 50px 0;
		}

		section.left > img,
		section.right > img {
			max-width: 250px;
		}

		section.long > img {
			max-width: 70%;
		}
	}
</style>
