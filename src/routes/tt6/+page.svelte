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
	<svg width="0" height="0" style="position: absolute;">
		<filter id="knockout-glow">
			<feComponentTransfer in="SourceAlpha" result="solid-alpha">
				<feFuncA type="linear" slope="100" />
			</feComponentTransfer>
			<feGaussianBlur in="solid-alpha" stdDeviation="8" result="glow-blur" />
			<feFlood flood-color="#ffffff" result="glow-color" />
			<feComposite in="glow-color" in2="glow-blur" operator="in" result="colored-glow" />
			<feComposite in="colored-glow" in2="solid-alpha" operator="out" result="glow-outside-only" />
			<feMerge>
				<feMergeNode in="glow-outside-only" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</svg>

	<section class="hero">
		{#key firstVideoDone}
			<video autoplay muted loop={firstVideoDone} on:ended={handleEnd} poster={bgImg}>
				<source src={firstVideoDone ? bg2 : bg1} type="video/mp4" />
			</video>
		{/key}
		<h1>
			<span class="cWrap cw1"
				><span class="card c1"><span class="c11">Cross</span><span class="c12">lake</span></span
				></span
			>
			<span class="cWrap cw2"
				><span class="card c2"><span class="c21">Cross</span><span class="c22">over</span></span
				></span
			>
		</h1>
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

	.hero h1 {
		color: white;
		text-align: center;
		font-size: 15vh;
		font-weight: 900;
	}

	.hero .card {
		position: relative;
		display: inline-block;
		background: none;
		text-align: center;
		padding: 0em 0.2em;
		border-radius: 1vh;
		margin: 1vh;
		overflow: hidden;

		--radius: 2vh;
		--a: calc(var(--radius) / tan(67.5deg));
		--b: calc(var(--radius) / tan(67.5deg) / sqrt(2));
	}

	.hero .card::before {
		content: '';
		position: absolute;
		z-index: -1;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: linear-gradient(
			to top,
			rgba(4, 100, 176, 0.5),
			rgba(1, 47, 104, 0.7) 30%,
			rgba(2, 14, 34, 0.7)
		);
	}

	.hero .card span {
		mix-blend-mode: add;
		vertical-align: top;
		display: inline-block;
	}

	.hero .card .c12 {
		margin-top: 0.3em;
	}

	.hero .card .c21 {
		margin-top: 0.3em;
	}

	.hero .card .c11,
	.hero .card .c22 {
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgb(0, 160, 223));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
		-webkit-text-stroke: 1px rgba(105, 255, 255, 0.6);
	}

	.hero .card .c12,
	.hero .card .c21 {
		background: linear-gradient(to bottom, rgba(230, 248, 227, 0.1), rgba(61, 174, 43, 0.8));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
		-webkit-text-stroke: 1px rgba(79, 228, 192, 0.6);
	}

	.hero .cw1 {
		transform: translateX(-25%);
	}

	.hero .c1 {
		clip-path: shape(
			from var(--radius) 0,
			line to calc(100% - var(--radius)) 0,
			arc to 100% var(--radius) of var(--radius) cw,
			line to 100% calc(100% - var(--radius)),
			arc to calc(100% - var(--radius)) 100% of var(--radius) cw,
			line to calc(53.5% + var(--a)) 100%,
			arc to calc(53.5% - var(--b)) calc(100% - var(--b)) of var(--radius) cw,
			line to calc(46.5% + var(--b)) calc(75% + var(--b)),
			arc to calc(46.5% - var(--a)) 75% of var(--radius) ccw,
			line to calc(5% + var(--a)) 75%,
			arc to calc(5% - var(--b)) calc(75% - var(--b)) of var(--radius) cw,
			line to var(--b) calc(75% - 25% * 5 / 7 + var(--b)),
			arc to 0 calc(75% - 25% * 5 / 7 - var(--a)) of var(--radius) cw,
			line to 0 var(--radius),
			arc to var(--radius) 0 of var(--radius) cw,
			close
		);
	}

	.hero .c1 span {
		transform: translateY(-0.1em);
	}

	.hero .cw2 {
		margin-top: -0.4em;
		transform: translateX(25%);
	}

	.hero .c2 {
		clip-path: shape(
			from var(--radius) 100%,
			line to calc(100% - var(--radius)) 100%,
			arc to 100% calc(100% - var(--radius)) of var(--radius) ccw,
			line to 100% var(--radius),
			arc to calc(100% - var(--radius)) 0 of var(--radius) ccw,
			line to calc(53.5% + var(--a)) 0,
			arc to calc(53.5% - var(--b)) calc(var(--b)) of var(--radius) ccw,
			line to calc(46.5% + var(--b)) calc(25% - var(--b)),
			arc to calc(46.5% - var(--a)) 25% of var(--radius) cw,
			line to calc(5% + var(--a)) 25%,
			arc to calc(5% - var(--b)) calc(25% + var(--b)) of var(--radius) ccw,
			line to var(--b) calc(25% + 25% * 5 / 7 - var(--b)),
			arc to 0 calc(25% + 25% * 5 / 7 + var(--a)) of var(--radius) ccw,
			line to 0 calc(100% - var(--radius)),
			arc to var(--radius) 100% of var(--radius) ccw,
			close
		);
	}

	.cWrap {
		filter: url(#knockout-glow);
		display: block;
	}

	.hero .date {
		position: absolute;
		bottom: 1vh;
		color: rgb(128, 255, 255);
		font-size: 4vh;

		/* background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(128, 255, 255, 1));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent; */
		text-shadow: 0 0 5px black;
	}
</style>
