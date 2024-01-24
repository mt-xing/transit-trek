<script lang="ts">
</script>

<div id="bgImg"></div>

<div class="textBlurWrap">
	<svg aria-hidden="true" id="title">
		<clipPath id="clipPath">
			<text dominant-baseline="hanging" text-anchor="middle" x="50%" y="0%">Race Across</text>
			<text dominant-baseline="hanging" text-anchor="middle" x="50%" y="30%">Seattle</text>
		</clipPath>
	</svg>
</div>
<h1>
	<span class="firstLine">Race Across</span><br />
	<span class="secondLine">Seattle</span>
</h1>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	h1 {
		margin-top: -30vw;

		font-family: 'Segoe UI', 'Helvetica', sans-serif;
		font-weight: 900;
		font-size: 10vw;
		text-align: center;

		z-index: 2;
		position: relative;

		color: rgba(0, 0, 0, 0);
		-webkit-text-stroke: 0.5vw black;
		paint-order: stroke fill;
	}

	h1 .secondLine {
		line-height: 9vw;
		position: relative;
	}

	.textBlurWrap {
		backdrop-filter: invert(1) blur(5px);
		clip-path: url(#clipPath);

		margin: 0;
		position: relative;

		font-family: 'Segoe UI', 'Helvetica', sans-serif;
		font-weight: 900;
		font-size: 10vw;
		text-align: center;
	}

	.textBlurWrap text:nth-child(2),
	h1 .secondLine {
		font-size: 17.5vw;
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
