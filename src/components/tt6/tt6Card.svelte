<script lang="ts">
	let visible = false;
	export let isRed: boolean = false;
	export let fillWidth: boolean = false;

	function onVisible(node: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.5 },
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			},
		};
	}
</script>

<section
	class={`cardWrap${visible ? ' visible' : ''}${isRed ? ' red' : ''}${fillWidth ? ' fill' : ''}`}
	use:onVisible
>
	<div class="card">
		<slot />
	</div>
</section>

<style>
	.cardWrap {
		filter: url(#knockout-glow);
		display: block;

		transform: scale(1.2);
		opacity: 0;
		transition:
			transform 1s cubic-bezier(0.23, 1, 0.32, 1),
			opacity 1s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.cardWrap.visible {
		transform: scale(1);
		opacity: 1;
	}

	.card {
		position: relative;
		display: inline-flex;
		flex-direction: column;
		background: none;
		text-align: center;
		padding: 0.5em 1em 1.75em 1em;
		border-radius: 1vh;
		margin: 1vh;
		overflow: hidden;

		color: white;
		font-size: 20px;

		--radius: 1em;
		--a: calc(var(--radius) / tan(67.5deg));
		--b: calc(var(--radius) / tan(67.5deg) / sqrt(2));
		--notch: 0.5em;

		clip-path: shape(
			from var(--radius) 0,
			line to calc(100% - var(--radius)) 0,
			arc to 100% var(--radius) of var(--radius) cw,
			line to 100% calc(100% - var(--radius)),
			arc to calc(100% - var(--radius)) 100% of var(--radius) cw,
			line to calc(50% + var(--notch) + var(--a)) 100%,
			arc to calc(50% + var(--notch) - var(--b)) calc(100% - var(--b)) of var(--radius) cw,
			line to calc(50% - var(--notch) + var(--b)) calc(100% - 2 * var(--notch) + var(--b)),
			arc to calc(50% - var(--notch) - var(--a)) calc(100% - 2 * var(--notch)) of var(--radius) ccw,
			line to var(--radius) calc(100% - 2 * var(--notch)),
			arc to 0 calc(100% - 2 * var(--notch) - var(--radius)) of var(--radius) cw,
			line to 0 var(--radius),
			arc to var(--radius) 0 of var(--radius) cw,
			close
		);
	}

	.card::before {
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

	.red .card::before {
		background: linear-gradient(
			to top,
			rgba(128, 1, 1, 0.7),
			rgba(64, 4, 8, 0.5) 30%,
			rgba(34, 2, 5, 0.7)
		);
	}

	.fill .card {
		display: flex;
	}
</style>
