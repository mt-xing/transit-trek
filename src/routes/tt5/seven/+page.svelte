<script lang="ts">
	function setTime() {
		const d = new Date();
		const hours = d.getHours() % 12;
		return `${hours === 0 ? '12' : hours}:${padToTwo(d.getMinutes())}`;
	}

	let time = setTime();
	let isTime = false;

	function padToTwo(n: number) {
		if (n === 0) {
			return '00';
		}
		if (n < 10) {
			return `0${n}`;
		}
		return n;
	}

	setInterval(() => {
		time = setTime();
		if (time === '5:20' || time === '17:20' || time === '05:20') {
			isTime = true;
		} else {
			isTime = false;
		}
	}, 1000);
</script>

<svelte:head>
	<title>Extremely Secret Code</title>
</svelte:head>

<div class="content {isTime ? 'time' : ''}">
	<p>Your code is:</p>
	<h1>7</h1>
	<p>
		Current time: {#if isTime}✅{/if}<span>{time}</span>
	</p>
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	.content {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: black;
		color: white;
		width: 100%;
		padding: 0;
		margin: 0;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	.content.time {
		background: #2ecc71;
		color: black;
	}

	h1 {
		font-size: 75vh;
		margin: -27vh 0 -22vh 0;
	}

	p {
		font-size: 4vh;
	}

	span {
		font-family: 'Consolas', monospace;
	}
</style>
