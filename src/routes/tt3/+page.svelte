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

<!-- <h1>
	<span class="firstLine">Race Across</span><br />
	<span class="secondLine">Seattle</span>
</h1> -->

<style>
	:global(body) {
		padding: 0;
		margin: 0;
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
