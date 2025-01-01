<script lang="ts">
	import ttLogo from '$lib/images/tt-logo-blank.png';
	import linkStation from '$lib/images/link_station.jpg';
	import tt3Bg from '$lib/images/transit-trek-bg-wide.png';
	import tt4Bg from '$lib/images/tt4/bg_graphic.png';
	import tt4Text from '$lib/images/tt4/text_clean_no_glow.png';
	import tt5Bg from '$lib/images/tt5/tt5_bg.jpg';
	import tt5Text from '$lib/images/tt5/tt5_logo_cropped.png';
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

<section class="picsection ttWrap">
	<h2>Thanks For a Great 2024 Season!</h2>
	<div class="ttList">
		<a href="/tt3" class="tt3">
			<div class="textWrap">
				<div class="textBlurWrap">
					<svg aria-hidden="true">
						<clipPath id="clipPath">
							<text dominant-baseline="hanging" text-anchor="middle" x="50%" y="0%"
								>Race Across</text
							>
							<text dominant-baseline="hanging" text-anchor="middle" x="50%" y="30%">Seattle</text>
						</clipPath>
					</svg>
				</div>
				<div class="textShadowWrap">
					<h1>Race Across<br /><span>Seattle</span></h1>
					<svg aria-hidden="true">
						<mask id="maskPath">
							<rect width="100%" height="100%" fill="white" />
							<text color="black" dominant-baseline="hanging" text-anchor="middle" x="50%" y="0%"
								>Race Across</text
							>
							<text color="black" dominant-baseline="hanging" text-anchor="middle" x="50%" y="30%"
								>Seattle</text
							>
						</mask>
					</svg>
				</div>
			</div>
		</a>
		<a href="/tt4" class="tt4"
			>Hide and Seek
			<img src={tt4Text} alt="" /></a
		>
		<a href="/tt5" class="tt5">
			The Emerald City Expedition
			<img src={tt5Text} alt="" />
		</a>
	</div>
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

	.ttWrap::after {
		display: none;
	}

	.ttWrap::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		box-shadow: inset 0px 0px 15px black;
		z-index: 4;
		background: none;
		mask-image: none;
		backdrop-filter: none;
		pointer-events: none;
	}

	.ttWrap h2 {
		text-align: center;
		width: 100%;
		max-width: unset;
		position: relative;
		z-index: 2;
		position: absolute;
		top: 0;
	}

	.ttWrap {
		text-align: center;
		height: 600px;
		box-sizing: border-box;
		position: relative;
		padding: 0;
	}

	.ttWrap .ttList {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		font-size: 0;
		overflow: hidden;
	}

	.ttWrap .ttList a {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		width: calc(100% / 3);
		height: 100%;
		position: relative;
		background-size: cover;
		background-position: center;
		vertical-align: top;
	}

	.ttWrap .ttList a.tt3 {
		background-image: url($lib/images/transit-trek-bg-wide.png);
	}

	.ttWrap .ttList a.tt4 {
		background-image: url($lib/images/tt4/bg_graphic.png);
		border-left: 5px black solid;
		border-right: 5px black solid;
		box-sizing: border-box;
	}

	.ttWrap .ttList a.tt5 {
		background-image: url($lib/images/tt5/tt5_bg.jpg);
	}

	.ttWrap .ttList a img {
		max-width: 100%;
		max-height: 100%;
		transform: scale(1);

		transition: transform 0.25s ease-in-out;
	}

	.ttWrap .ttList a:hover img,
	.ttWrap .ttList a:focus img {
		transform: scale(1.1);
	}

	.ttWrap .ttList a:active img {
		transform: scale(0.9);
		transition: transform 0.05s ease-in-out;
	}

	.ttWrap .ttList a.tt3:hover .textWrap,
	.ttWrap .ttList a.tt3:focus .textWrap {
		transform: translateY(-50%) translateZ(0) scale(1.1);
	}

	.ttWrap .ttList a.tt3:active .textWrap {
		transform: translateY(-50%) translateZ(0) scale(0.9);
		transition: transform 0.05s ease-in-out;
	}

	.textWrap {
		margin: 0;
		height: 8.8vw;
		width: 100%;
		position: absolute;

		transform: translateY(-50%) translateZ(0) scale(1);
		top: 50%;
		transition: transform 0.25s ease-in-out;
	}

	.textBlurWrap text:nth-child(2),
	.textShadowWrap svg text:nth-child(3),
	.textShadowWrap h1 span {
		font-size: 7vw;
	}

	.textShadowWrap {
		margin: 0;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		mask: url(#maskPath);
	}

	.textShadowWrap h1 {
		font-family: 'Noto Sans', 'Helvetica', sans-serif;
		font-weight: 900;
		font-size: 4vw;
		text-align: center;
		margin: 0;
		line-height: 3.6vw;
		transform: translateY(1px);

		color: white;

		text-shadow: black 0 0 0.6vw;
		-webkit-text-stroke: 0.52vw black;
		paint-order: stroke fill;
	}

	.textShadowWrap svg {
		pointer-events: none;
		font-family: 'Noto Sans', 'Helvetica', sans-serif;
		font-weight: 900;
		font-size: 4vw;
		text-align: center;
		position: absolute;
		top: 0;
		width: 100%;
		height: 10vw;
	}

	#maskPath {
		background: white;
		color: black;
	}

	.textShadowWrap h1 span {
		line-height: 5.2vw;
		-webkit-text-stroke: 0.72vw black;
	}

	.textBlurWrap {
		pointer-events: none;

		backdrop-filter: invert(1) blur(5px);
		clip-path: url(#clipPath);

		margin: 0;

		font-family: 'Noto Sans', 'Helvetica', sans-serif;
		font-weight: 900;
		font-size: 4vw;
		text-align: center;

		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.textBlurWrap svg {
		width: 100%;
		height: 10vw;
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
		.picsection.ttWrap {
			padding-left: 0;
			padding-right: 0;
		}

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

		.ttWrap h2 {
			font-size: 5vw;
		}
	}

	@media (max-width: 600px) {
		.picsection {
			padding-left: 10%;
			padding-right: 10%;
		}
	}

	@media (max-width: 800px) {
		.ttWrap {
			height: 800px;
		}

		.ttWrap h2 {
			background: black;
			margin-top: 0;
			position: absolute;
			padding-top: 1vw;
		}

		.ttWrap h2::after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			top: 100%;
			height: 5vw;
			background: linear-gradient(to bottom, black, rgba(0, 0, 0, 0));
		}

		.ttWrap .ttList {
			padding-top: 5vw;
		}

		.ttWrap .ttList a {
			height: calc(100% / 3);
			width: 100%;
		}

		.ttWrap .ttList a.tt4 {
			border-left: none;
			border-right: none;
			border-top: 5px black solid;
			border-bottom: 5px black solid;
		}

		.textWrap {
			height: 17.6vw;
		}

		.textBlurWrap text:nth-child(2),
		.textShadowWrap svg text:nth-child(3),
		.textShadowWrap h1 span {
			font-size: 14vw;
		}

		.textShadowWrap h1 {
			font-size: 8vw;
			line-height: 7.2vw;
			text-shadow: black 0 0 1.2vw;
			-webkit-text-stroke: 1.04vw black;
		}

		.textShadowWrap svg {
			font-size: 8vw;
			height: 20vw;
		}

		.textShadowWrap h1 span {
			line-height: 10.4vw;
			-webkit-text-stroke: 1.44vw black;
		}

		.textBlurWrap {
			font-size: 8vw;
		}

		.textBlurWrap svg {
			height: 20vw;
		}

		.ttWrap::before {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: -5vw;
			box-shadow: inset 0px 0px 15px black;
			z-index: 4;
			background: none;
			mask-image: none;
			backdrop-filter: none;
			pointer-events: none;
		}

		.ttWrap .ttList a.tt4 img {
			max-width: 80%;
		}
	}
</style>
