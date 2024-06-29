<script lang="ts">
	import ttLogo from '$lib/images/tt-logo-blank.png';
	import linkStation from '$lib/images/link_station.jpg';
	import tt3Bg from '$lib/images/transit-trek-bg-wide.png';
</script>

<section class="header">
	<div class="video">
		<video autoplay loop muted preload="auto" poster={linkStation}>
			<source src="/home.mp4" type="video/mp4" />
			<img src={linkStation} alt="" />
		</video>
	</div>
	<h1 class="topLogo"><img src={ttLogo} alt="" /> Seattle Transit Trek</h1>
</section>

<section class="subheading">
	<p>
		Transit Treks are part scavenger hunt, part games of skill, strategy, and pure dumb luck played
		across the Puget Sound.
	</p>
	<p>
		Each Trek has different rules, but they all take familiar concepts and blow them up to span the
		entire city. From Hide and Seek to Capture the Flag, players will traverse the city, completing
		challenges along the way, to compete for glory and not much else. All on public transit, of
		course. Transit Treks are for anyone with an ORCA card and a willingness to use it.
	</p>
	<a href="/about" class="bigbtn">Learn More</a>
</section>
<section class="transit">
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

	.subheading {
		background: #f24d69;
		color: white;
		padding: 70px 100px;
		font-size: 22px;
		text-align: center;
	}

	.transit {
		min-height: 40vh;
		padding: 100px;
		position: relative;
		color: white;

		font-size: 1.2em;

		box-shadow: inset 0 0 15px black;
	}

	.transit h2 {
		font-size: 40px;

		text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);
		-webkit-text-stroke: 5px black;
		paint-order: stroke fill;
	}

	.transit ul {
		max-width: 40%;
		list-style: none;
		padding: 0;
	}

	.transit li {
		display: block;
		padding: 0;
		margin-bottom: 20px;
	}

	.transit li a {
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

	.transit li a:hover,
	.transit li a:focus {
		transform: scale(1.01);
	}

	.transit li a:active {
		transform: scale(0.99);
		transition: transform 0.1s ease-in-out;
	}

	.transit li a h3 {
		margin-bottom: 0;
		font-size: 24px;
	}

	.transit li a p {
		margin-top: 0;
	}

	.transit li a::before {
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

	.transit::before,
	.transit::after {
		content: '';

		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.transit::before {
		z-index: -1;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(5px);
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 70%);
	}

	.transit::after {
		z-index: -2;

		background-image: url($lib/images/pexels-josh-fields-seattle.jpg);
		background-size: cover;
		background-position: center;
	}

	.bigbtn {
		position: relative;
		z-index: 2;
		margin-top: 25px;

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
</style>
