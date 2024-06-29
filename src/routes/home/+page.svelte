<script lang="ts">
	import ttLogo from '$lib/images/tt-logo-blank.png';
	import linkStation from '$lib/images/link_station.jpg';
	import tt3Bg from '$lib/images/transit-trek-bg-wide.png';
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
	<h1 class="topLogo"><img src={ttLogo} alt="" /> Seattle Transit Trek</h1>
</section>

<section class="midsection">
	<p>
		Transit Treks are part scavenger hunt, part games of skill, strategy, and pure dumb luck played
		across the Puget Sound.
	</p>
</section>

<section class="picsection tt3">
	<h2>Most Recent Game</h2>

	<div class="textWrap">
		<div class="textBlurWrap">
			<svg aria-hidden="true">
				<clipPath id="clipPath">
					<text dominant-baseline="hanging" text-anchor="middle" x="50%" y="0%">Race Across</text>
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

	<p class="btnwrap">
		<a href="/tt3" class="bigbtn">Learn More</a>
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
	<a href="/about" class="bigbtn">FAQs</a>
</section>

<section class="midsection">
	<p>Sound interesting? Join the Signal group to stay updated on new events.</p>
</section>

<section class="picsection previousEvents">
	<h2>Previous Events</h2>
	<ul>
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
				<h3>Dash From Dushma</h3>
				<p>September 16, 2023</p>
			</a>
		</li>
		<li>
			<a
				href="https://docs.google.com/document/d/1P1TBWLbEbnG3r6GH53068GhnDM3Ym05oeC0l_9479mo/"
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
		<a href="https://www.pexels.com/photo/aerial-view-of-city-buildings-3964406/" target="_blank">
			Josh Fields on Pexels
		</a>
		and by
		<a
			href="https://unsplash.com/photos/selective-focus-photography-of-glacier-mountain-under-blue-sky-jF6GX9rX3Bw"
			target="_blank"
		>
			Lucas Davies on Unsplash
		</a>. The graphic for Transit Trek 3 includes additional works credited on the
		<a href="/tt3">game's page</a>.
	</p>
</section>

<style>
	.header {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 80vh;
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

		top: 5vh;
		left: 0;
		right: 0;
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
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 70%);
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

	.tt3::after {
		background-image: url($lib/images/transit-trek-bg-wide.png);
	}

	.tt3::before {
		display: none;
	}

	.tt3 h2 {
		text-align: center;
		width: 100%;
		max-width: unset;
	}

	.tt3 {
		text-align: center;
	}

	.tt3 .title span {
		font-size: 13.5vw;
		margin-top: -5vw;
		display: inline-block;
	}

	.tt3 .btnwrap {
		padding: 40px 80px;
		text-align: center;

		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(10px);
		box-shadow: 0 0 15px 10px black;

		max-width: 500px;
		width: 90%;
		box-sizing: border-box;
		margin: 1vw auto;
	}

	.tt3 .bigbtn::before {
		background: linear-gradient(
			to right,
			#e6400e 0%,
			#9366b3 25%,
			#0596cf 50%,
			rgba(0, 0, 255, 0) 100%
		);
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
		background: linear-gradient(to right, #4ef26d 0%, #4e6af2 50%, rgba(0, 0, 255, 0) 100%);
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

	.textWrap {
		margin-top: 0;
		height: 25vw;
		width: 100%;
		position: relative;

		transform: translateZ(0);
	}

	.textBlurWrap text:nth-child(2),
	.textShadowWrap svg text:nth-child(3),
	.textShadowWrap h1 span {
		font-size: 17.5vw;
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
		font-size: 10vw;
		text-align: center;
		margin: 0;
		line-height: 9vw;
		transform: translateY(0.1vw);

		color: white;

		text-shadow: black 0 0 1.5vw;
		-webkit-text-stroke: 1.3vw black;
		paint-order: stroke fill;
	}

	.textShadowWrap svg {
		pointer-events: none;
		font-family: 'Noto Sans', 'Helvetica', sans-serif;
		font-weight: 900;
		font-size: 10vw;
		text-align: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 25vw;
	}

	#maskPath {
		background: white;
		color: black;
	}

	.textShadowWrap h1 span {
		line-height: 13vw;
		-webkit-text-stroke: 1.8vw black;
	}

	.textBlurWrap {
		pointer-events: none;

		backdrop-filter: invert(1) blur(5px);
		clip-path: url(#clipPath);

		margin: 0;

		font-family: 'Noto Sans', 'Helvetica', sans-serif;
		font-weight: 900;
		font-size: 10vw;
		text-align: center;

		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.textBlurWrap svg {
		width: 100%;
		height: 25vw;
	}
</style>
