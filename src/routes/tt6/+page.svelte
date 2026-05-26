<script lang="ts">
	import TopLogo from '../../components/topLogo.svelte';

	import bg1 from '$lib/images/tt6/bg1.mp4';
	import bg2 from '$lib/images/tt6/bg2.mp4';
	import bgImg from '$lib/images/tt6/bg.jpg';

	let firstVideoDone = false;
	function handleEnd() {
		if (!firstVideoDone) {
			firstVideoDone = true;
		}
	}
</script>

<svelte:head>
	<title>Transit Trek: Crosslake Crossover</title>
	<meta name="description" content="Seattle Transit Trek's June 2026 event" />
</svelte:head>

<div id="outerWrap">
	<TopLogo />

	<video id="preload" muted>
		<source src={bg2} type="video/mp4" />
	</video>

	<section class="hero">
		{#key firstVideoDone}
			<video autoplay muted loop={firstVideoDone} on:ended={handleEnd} poster={bgImg}>
				<source src={firstVideoDone ? bg2 : bg1} type="video/mp4" />
			</video>
		{/key}
		<h1>Crosslake Crossover</h1>
		<h2 class="date">June 13, 2026</h2>
	</section>
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	#outerWrap {
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	.hero {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.hero video {
		object-fit: cover;
		object-position: center;
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	video#preload {
		position: absolute;
		top: -1px;
		left: -1px;
		width: 0;
		height: 0;
	}
</style>
