<script lang="ts">
	import ttLogo from '$lib/images/tt-logo-blank.png';
	import linkStation from '$lib/images/link_station.jpg';
	import tt3Bg from '$lib/images/transit-trek-bg-wide.png';
	import tt4Bg from '$lib/images/tt4/bg_graphic.png';
	import tt5Bg from '$lib/images/tt5/tt5_bg.jpg';
	import ett1Bg from '$lib/images/ett1/ett1_blur_preview.png';
	import BigBtn from '../components/bigBtn.svelte';
</script>

<svelte:head>
	<title>Seattle Transit Trek</title>
	<meta
		name="description"
		content="The Seattle Transit Trek is a team-based scavenger hunt played in Seattle using its public
		transit system. Teams compete by completing various challenges around town while using Seattle's
		public transit system to get around, but each iteration of the Transit Trek has its own unique
		twist."
	/>
</svelte:head>

<section class="header">
	<div class="video">
		<video autoplay loop muted preload="auto" poster={linkStation}>
			<source src="/home.mp4" type="video/mp4" />
			<img src={linkStation} alt="" />
		</video>
	</div>
	<h1 class="topLogo">
		<img src={ttLogo} alt="" />
		<span class="text">Seattle <span>Transit Trek</span></span>
	</h1>
</section>

<section class="midsection">
	<p>
		Transit Treks are part scavenger hunt, part games of skill, strategy, and pure dumb luck played
		across the Puget Sound.
	</p>
</section>

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
<section class="picsection tt6">
	<h2>Upcoming Game</h2>

	<div>
		<span class="cWrap cw1"
			><span class="card c1"><span class="c11">Cross</span><span class="c12">lake</span></span
			></span
		>
		<span class="cWrap cw2"
			><span class="card c2"><span class="c21">Cross</span><span class="c22">over</span></span
			></span
		>
	</div>

	<p class="btnwrap">
		<BigBtn
			isBlock={true}
			href="/tt6"
			text="Learn More"
			color={['rgb(0, 160, 223)', 'rgba(255, 255, 255, 0.1)']}
			customStyles="box-shadow: none; clip-path: polygon(1em 0%, 100% 0%, 100% calc(100% - 1em), calc(100% - 1em) 100%, 0% 100%, 0% 1em)"
		/>
	</p>
</section>

<section class="midsection">
	Transit Treks take place several times each year during the summer months. The game premise and
	rules change each time, but one thing remains constant: the Transit Trek is always completed on
	public transit!
</section>

<section class="picsection rules">
	<h2>See the City</h2>
	<p>
		Each Trek has different rules, but they all take familiar concepts and blow them up to span the
		entire city. From Hide and Seek to Capture the Flag, players will traverse the city, completing
		challenges along the way, to compete for glory and not much else. All on public transit.
	</p>

	<h2>Ride the Transit</h2>
	<p>
		Ever taken the monorail? How about the streetcar? How well do you <em>really</em> know the Link?
		Show off your understanding of Seattle's public transit as you traverse the city by foot, bus, train,
		and more. Transit Treks are for anyone with an ORCA card and a willingness to use it.
	</p>

	<h2>Trek to Victory</h2>
	<BigBtn href="/about" text="FAQs" color={['#4ef26d', '#4e6af2']} />
</section>

<section class="midsection">
	<p>Sound interesting? Join the Signal group to stay updated on new events.</p>
</section>

<section class="picsection previousEvents">
	<h2>Previous Events</h2>
	<ul>
		<li>
			<a href="/ett1" rel="external" style="background-image: url({ett1Bg});">
				<h3>Eastside Transit Trek</h3>
				<p>April 12, 2025</p>
			</a>
		</li>
		<li>
			<a href="/tt5" style="--num: '5';background-image: url({tt5Bg});">
				<h3>Emerald City Expedition</h3>
				<p>September 21, 2024</p>
			</a>
		</li>
		<li>
			<a
				href="/tt4"
				rel="external"
				style="--num: '4';background-image: linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0)), url({tt4Bg});"
			>
				<h3 style="-webkit-text-stroke: 4px black;">Hide and Seek 2</h3>
				<p>August 3, 2024</p>
			</a>
		</li>
		<li>
			<a
				href="/tt3"
				style="--num: '3';background-image: url({tt3Bg}); background-position: top center;"
			>
				<h3>Race Across Seattle</h3>
				<p>June 8, 2024</p>
			</a>
		</li>
		<li>
			<a
				href="/tt2/index.html"
				style="--num: '2';background: linear-gradient(to right, #1B5E20, #7CB342)"
			>
				<h3>Hide and Seek</h3>
				<p>September 16, 2023</p>
			</a>
		</li>
		<li>
			<a
				href="/tt2/tt1.pdf"
				style="--num: '1';background: linear-gradient(to right, #f24d69, #FF6F00)"
			>
				<h3>Ballard and Fremont</h3>
				<p>May 20, 2023</p>
			</a>
		</li>
	</ul>
</section>

<section class="midsection credit">
	<p>
		This page includes photography by
		<a href="https://www.pexels.com/photo/aerial-view-of-city-buildings-3964406/" target="_blank"
			>Josh Fields on Pexels</a
		>
		and by
		<a
			href="https://unsplash.com/photos/selective-focus-photography-of-glacier-mountain-under-blue-sky-jF6GX9rX3Bw"
			target="_blank">Lucas Davies on Unsplash</a
		>. The graphics for individual games include additional works credited on each game's respective
		page. We don't recommend running on escalators, despite what the montage above shows.
	</p>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

	:global(body) {
		padding: 0;
		margin: 0;
		font-family: 'Noto Sans', 'Helvetica', sans-serif;
	}

	.header {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 80vh;
		min-height: 500px;
		overflow: hidden;
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: inset 0 0 10px black;
	}

	.header .video {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		z-index: -1;
		clip: rect(0, auto, auto, 0);
	}

	.header video {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 80%;
		height: 80lvh;
		min-height: 500px;

		object-fit: cover;
		object-position: center;

		z-index: -2;
	}

	.topLogo {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		color: white;
		font-weight: 900;
		font-size: 100px;
		text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
		-webkit-text-stroke: 10px black;
		paint-order: stroke fill;

		max-width: 90%;
		margin: 0 auto;
	}

	.topLogo img {
		width: 170px;
		margin-right: 60px;
		box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.5);
	}

	.header::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: -1;
		mask-image: radial-gradient(rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0));
	}

	.midsection {
		background: linear-gradient(to bottom right, #f24d69, #e53935);
		color: white;
		padding: 70px max(15%, 50px);
		font-size: 22px;
		text-align: center;

		text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
	}

	.picsection {
		min-height: 40vh;
		padding: 100px;
		position: relative;
		color: white;

		font-size: 1.2em;

		box-shadow: inset 0 0 15px black;
	}

	.picsection h2 {
		font-size: 40px;

		text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
		-webkit-text-stroke: 5px black;
		paint-order: stroke fill;
	}

	.picsection::before,
	.picsection::after {
		content: '';

		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.picsection::before {
		z-index: -1;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(5px);
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 70%);
	}

	.picsection::after {
		z-index: -2;

		background-size: cover;
		background-position: center;
		background-attachment: fixed;
	}

	.picsection ul,
	.picsection p,
	.picsection h2 {
		width: 60%;
		max-width: 600px;
	}

	.rules::after {
		background-image: url($lib/images/pexels-josh-fields-seattle.jpg);
		background-position: center right;
	}

	.previousEvents ul {
		list-style: none;
		padding: 0;
	}

	.previousEvents li {
		display: block;
		padding: 0;
		margin-bottom: 20px;
	}

	.previousEvents li a {
		display: block;
		padding: 20px 60px 20px 100px;
		background: black;
		color: white;
		text-decoration: none;
		position: relative;

		background-position: center;
		background-size: cover;

		box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.5);

		text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
		-webkit-text-stroke: 2px black;
		paint-order: stroke fill;

		transition: transform 0.2s ease-in-out;
		transform: scale(1);
	}

	.previousEvents li a:hover,
	.previousEvents li a:focus {
		transform: scale(1.01);
	}

	.previousEvents li a:active {
		transform: scale(0.99);
		transition: transform 0.1s ease-in-out;
	}

	.previousEvents li a h3 {
		margin-bottom: 0;
		font-size: 24px;
	}

	.previousEvents li a p {
		margin-top: 0;
	}

	.previousEvents li a::before {
		content: var(--num);
		position: absolute;
		top: 0;
		left: 20px;
		bottom: 0;
		font-size: 100px;
		font-weight: bolder;
		opacity: 0.5;
		text-shadow: none;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.picsection.previousEvents::after {
		background-image: url($lib/images/lucas-davies-unsplash-rainier.jpg);
	}

	.midsection.credit {
		padding: 30px 50px;
		font-size: 14px;
		text-align: left;

		text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
	}

	.midsection.credit a {
		color: white;
	}

	.midsection.credit a:hover,
	.midsection.credit a:focus {
		text-decoration: none;
	}

	.midsection.credit a:active {
		text-decoration: underline;
	}

	@media (max-width: 1400px) {
		.topLogo .text {
			display: inline-flex;
			flex-direction: column;
			font-size: 80px;
		}
	}

	@media (max-width: 1000px) {
		.topLogo .text {
			font-size: 8vw;
			-webkit-text-stroke: 1vw black;
		}

		.topLogo img {
			width: 18vw;
			margin-right: 5vw;
		}
	}

	@media (max-width: 800px) {
		.picsection::before {
			z-index: -1;
			background: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(5px);
			mask-image: unset;
		}

		.picsection ul,
		.picsection p,
		.picsection h2 {
			width: 100%;
			max-width: unset;
		}
	}

	@media (max-width: 600px) {
		.picsection {
			padding-left: 10%;
			padding-right: 10%;
		}
	}

	.tt6::after {
		background-image: url($lib/images/tt6/bg.jpg);
		background-position: center;

		background-attachment: unset;
		position: fixed;
	}

	.tt6::before {
		display: none;
	}

	.tt6 h2 {
		text-align: center;
		width: 100%;
		max-width: unset;
	}

	.tt6 {
		text-align: center;
		max-width: 100%;
		overflow-x: hidden;
	}

	.tt6 .btnwrap {
		padding: 0;
		text-align: center;

		max-width: initial;
		width: initial;
		display: inline-block;
		box-sizing: border-box;
		margin: 1vw auto;
	}

	@media (max-width: 1000px) {
		.picsection.tt6 {
			padding-left: 0;
			padding-right: 0;
		}
	}

	@media (max-width: 800px) {
		.tt6 .btnwrap {
			max-width: unset;
			margin-top: 50px;
		}

		.tt6 h2 {
			font-size: 5vw;
		}
	}

	.tt6 .cWrap {
		filter: url(#knockout-glow);
		display: block;

		--xAmt: 0;
		transform: translateX(var(--xAmt));
		opacity: 1;
	}

	.tt6 > div {
		color: white;
		text-align: center;
		font-size: min(15vh, 10vw);
		font-weight: 900;
	}

	.tt6 .card {
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

	.tt6 .card::before {
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

	.tt6 .card span {
		mix-blend-mode: add;
		vertical-align: top;
		display: inline-block;
	}

	.tt6 .card .c12 {
		margin-top: 0.3em;
	}

	.tt6 .card .c21 {
		margin-top: 0.3em;
	}

	.tt6 .card .c11,
	.tt6 .card .c22 {
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgb(0, 160, 223));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
		-webkit-text-stroke: 1px rgba(105, 255, 255, 0.6);
	}

	.tt6 .card .c12,
	.tt6 .card .c21 {
		background: linear-gradient(to bottom, rgba(230, 248, 227, 0.1), rgba(61, 174, 43, 0.8));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
		-webkit-text-stroke: 1px rgba(79, 228, 192, 0.6);
	}

	.tt6 .cw1 {
		margin-top: 0.3em;
		--xAmt: max(-20vh, -15vw);
	}

	.tt6 .c1 {
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

	.tt6 .c1 span {
		transform: translateY(-0.1em);
	}

	.tt6 .cw2 {
		margin-top: -0.4em;
		--xAmt: min(20vh, 15vw);
	}

	.tt6 .c2 {
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

	@media (max-width: 800px) {
		.tt6 > div {
			font-size: min(15vh, 15vw);
		}

		.tt6 .cw1 {
			--xAmt: max(-5vh, -5vw);
		}

		.tt6 .cw2 {
			--xAmt: min(5vh, 5vw);
			margin-top: -0.2em;
		}
	}
</style>
