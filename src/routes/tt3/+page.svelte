<script lang="ts">
</script>

<div id="bgImg"></div>

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

<main>
	<p>
		You are at Northgate Station to eat some yummy Chinese food. You soon realize you are actually
		yearning for the delicious food of Seattle’s historical Chinatown. You’re out of money, but by
		completing tasks, you can earn passes to take segments of public transit to make it all the way
		there by dinnertime.
	</p>

	<h2>Requirements</h2>
	<ul>
		<li>
			ORCA card with either a pass or at least $6 loaded on it
			<br /><small>Microsoft- and Amazon-issued ORCA cards suffice for this requirement</small>
		</li>
		<li>
			A smartphone
			<br /><small>One team member must have an iPhone with Find My Friends enabled</small>
		</li>
		<li>Joined the Signal group</li>
		<li>
			Either:
			<ul>
				<li>A bandana from Seattle Transit Trek #2, or</li>
				<li>
					$0.50 participation fee. In return, you will be given a bandana to be used throughout the
					game (and to keep as a souvenir!)
				</li>
			</ul>
		</li>
	</ul>
	<p>Optional but recommended:</p>
	<ul>
		<li>Sunscreen</li>
		<li>Water</li>
		<li>Battery pack (for your phone)</li>
		<li>Snacks, if you might get hungry during the event</li>
		<li>
			A change of clothes or a towel, if you are preparing for the possibility of a task involving
			water
		</li>
	</ul>

	<h2>Basics</h2>
	<ul>
		<li>To take public transit, you have to complete certain tasks of varying difficulty</li>
		<li>Most tasks are relatively close to public transit stations</li>
		<li>3 to 4 people per team</li>
		<li>4 hours long competition period</li>
	</ul>
</main>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	main {
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(10px);
		box-shadow: 0 0 15px 10px black;

		width: 90%;
		max-width: 1500px;
		margin: 15vh auto 12.5vh auto;
		color: white;
		padding: 5vh 10vh;
		box-sizing: border-box;
		font-family: 'Segoe UI', 'Helvetica', sans-serif;
		font-size: 20px;
	}

	.textWrap {
		margin-top: calc(50vh - 12.5vw);
		height: 25vw;
		width: 100%;
		position: relative;
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
		font-family: 'Segoe UI', 'Helvetica', sans-serif;
		font-weight: 900;
		font-size: 10vw;
		text-align: center;
		margin: 0;
		line-height: 9vw;

		color: white;

		text-shadow: black 0 0 1.5vw;
		-webkit-text-stroke: 1.3vw black;
		paint-order: stroke fill;
	}

	.textShadowWrap svg {
		font-family: 'Segoe UI', 'Helvetica', sans-serif;
		font-weight: 900;
		font-size: 10vw;
		text-align: center;
		position: absolute;
		top: 0;
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
		backdrop-filter: invert(1) blur(5px);
		clip-path: url(#clipPath);

		margin: 0;

		font-family: 'Segoe UI', 'Helvetica', sans-serif;
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

	#bgImg {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		background-image: url($lib/images/transit-trek-bg-wide.png);
		background-size: cover;
		background-position: center;
	}
</style>
