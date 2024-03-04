<script lang="ts">
	import { onMount } from 'svelte';
	import ttLogo from '$lib/images/tt-logo-blank.png';

	let y: number;
	let innerHeight: number;

	let loaded = false;
	onMount(() => {
		loaded = true;
	});

	let parallaxY: number;
	$: parallaxY = loaded ? y / (document.documentElement.scrollHeight - innerHeight) : 0;
</script>

<svelte:window bind:scrollY={y} bind:innerHeight />

<svelte:head>
	<title>About | Transit Trek</title>
	<meta name="description" content="About the Seattle Transit Trek" />
</svelte:head>

<div id="bgImg" style="background-position: 50% {parallaxY * 100}%"></div>

<div class="topLogo"><img src={ttLogo} alt="" /> Seattle Transit Trek</div>

<div class="textWrap">
	<div class="textBlurWrap">
		<svg aria-hidden="true">
			<clipPath id="clipPath">
				<text dominant-baseline="hanging" text-anchor="middle" x="50%" y="0%">About</text>
			</clipPath>
		</svg>
	</div>
	<div class="textShadowWrap">
		<h1>About</h1>
		<svg aria-hidden="true">
			<mask id="maskPath">
				<rect width="100%" height="100%" fill="white" />
				<text color="black" dominant-baseline="hanging" text-anchor="middle" x="50%" y="0%">
					About
				</text>
			</mask>
		</svg>
	</div>
</div>

<main>
	<h1>About the Seattle Transit Trek</h1>

	<p>
		The Seattle Transit Trek is a team-based scavenger hunt played in Seattle using its public
		transit system. Teams compete by completing various challenges around town while using Seattle's
		public transit system to get around, but each iteration of the Transit Trek has its own unique
		twist.
	</p>

	<p>
		Transit Treks take place several times each year during the summer months. The game premise and
		rules change each time, but one thing remains constant: the Transit Trek is always completed on
		public transit!
	</p>

	<h2>Frequently asked questions</h2>
	<h3>Logistics</h3>
	<p><b>Does it cost money to participate?</b></p>
	<p>
		To join the game, you need a Transit Trek bandana. If you purchased one previously, you can
		reuse it. If you need one, it's 50¢. You'll also need an ORCA card to use Seattle public
		transit. Most of our participants work at Microsoft, where ORCA cards are fully paid for by the
		company. However, if your employer does not give you an all-expenses paid ORCA card, be sure the
		card has at least $6 to last you throughout the duration of the game.
	</p>
	<p>
		In most games, there may be challenges that require a certain amount of money to complete. We
		try to keep the amount spent per person in each game to under $20. It is sometimes possible to
		complete most challenges without spending anything, but some challenges do require you to spend
		something. We try our best to avoid making spending mandatory!
	</p>
	<p><b>How long is each game?</b></p>
	<p>
		Each game requires 1 hour before the game to prepare. The games themselves each last 4 hours. We
		typically do preparation from 1-2pm at the starting location and the game typically runs between
		2-6pm.
	</p>
	<p><b>Is this a team-based or solo free-for-all game?</b></p>
	<p>
		Transit Treks are team-based. Team sizes are usually 4 people, although sizes of 3 to 5 are
		permitted.
	</p>
	<p><b>How do I participate in the Transit Trek?</b></p>
	<p>
		The Transit Trek Signal group is the main place where we post news about when the next Transit
		Trek will be. Ask one of the organizers or someone who's already in the Signal group for
		information on how to join. Once you are in the group, stay tuned for info on how to sign up for
		the Transit Trek.
	</p>
	<p><b>Do I need to work at Microsoft to participate in the Transit Trek?</b></p>
	<p>
		Nope! While the Transit Trek is mainly advertised for EIC Microsoft FTEs to participate, we also
		welcome Microsoft interns, Amazon employees, and other friends to join.
	</p>
	<p><b>Do I need to organize my own team?</b></p>
	<p>
		You can either form your own team of 4 participants or you can ask us to form a team for you! If
		you don't know anyone else participating, that's not a problem at all. You're still more than
		welcome to sign up!
	</p>
	<p>
		<b
			>Are there past Transit Treks I can refer back to so I have an idea of what they might be
			like? Should I study up on anything?</b
		>
	</p>
	<p>
		We're happy to share documents from some of the prior Transit Treks. However, keep in mind that
		the game changes each time, so looking at them will only give you some context on the overall
		premise of Transit Treks; it won't help you get a leg up on the upcoming game.
	</p>
	<p>
		The only thing you should absolutely study up on is the public transit network within the game
		area of the upcoming Transit Trek. While you are always welcome to use Google Maps to plan your
		journey, it'll serve you better if you know what routes exist ahead of time.
	</p>
	<p><b>What is the timeline of signing up and preparing for a Transit Trek?</b></p>
	<p>
		We tend to finalize the date and the theme of the game about one month ahead, but sometimes we
		might <s>procrastinate</s> be a bit more pressed for time, depending on the situation. Around this
		time, you'll need to sign up for the Transit Trek. The cutoff to sign up will usually be one week
		before the day of the Trek. This gives us enough time to create and assign teams.
	</p>
	<p>
		The full list of challenges will only be released when the game starts at 2pm on the day of the
		Trek.
	</p>
	<p><b>How accessible is the game?</b></p>
	<p>We try to make the game as accessible as possible. For example:</p>
	<ul>
		<li>
			You don't need to come prepared with your own team. We're happy to match you into a team!
		</li>
		<li>
			For food challenges, we try to ensure there is always a vegan option. That way, at least one
			person in the group should be able to complete it.
		</li>
		<li>
			Alcohol challenges are sometimes offered as a fun alternative for participants over the age of
			21, but there will not be any cases where a team will be required to do an alcohol challenge
			to have a chance of winning.
		</li>
		<li>
			Running for long distances is typically not permitted. Not everyone can run a 5K, and you're
			not expected to be in peak physical condition shape to be able to win this game!
		</li>
		<li>
			Prior knowledge should rarely help with completing challenges. It's assumed you have some
			basic pop culture context that most Americans have, but even if you don't, you can search the
			web to figure things out. For instance, we would never create a challenge where you are
			supposed to decipher Chinese characters. That would be unfair to anyone who doesn't already
			know Chinese because they would spend longer figuring it out than participants who can read
			Chinese. (The one exception is your prior knowledge of the public transit of Seattle. The
			better you know the Seattle public transit system before the game, the better off you will
			fare during the game.)
		</li>
	</ul>
	<h3>Game rules</h3>
	<p>
		Most game rules differ between each game. However, there are some rules that always remain
		constant. They are explained below in great detail (to ensure there is no ambiguity when the
		game is played).
	</p>
	<p><b>What can I travel on during the Transit Trek?</b></p>
	<p>
		You can either travel as a pedestrian or on public transit. The forms of public transit
		permitted are: (1) anything either branded as Sound Transit or operated by King County Metro,
		(2) the Seattle Center Monorail, and (3) the Seattle Streetcars.
	</p>
	<p>
		An easy way to tell if you can travel on a mode of transportation or not is: do they accept ORCA
		cards and accept ORCA regional day or monthly passes? If so, you can use it!
	</p>
	<p>
		Prohibited modes of transportation include but are not limited to: privately owned automobiles
		(including those used to provide rideshare services), police cars, fire trucks, ambulances,
		semi-trailer trucks, motorcycles, scooters (whether electric or manual), bicycles (whether
		electric, electric-assisted, or manual), unicycles, boats (including canoes and kayaks),
		paddleboards, jet skis, ships (including ferries operated by Washington State Ferries),
		airplanes, hydroplanes, seaplanes, and gliders.
	</p>
	<p>
		Washington State Ferries technically accept ORCA cards but they do not accept ORCA regional day
		or monthly passes, so they are prohibited. Also, they do not serve intra-Seattle routes, so as a
		practical matter, they aren't allowed.
	</p>
	<p><b>Can I get outside help?</b></p>
	<p>
		Using Google Maps, a search engine, or a chatbot is usually allowed unless expressly prohibited.
	</p>
	<p>Intentional communication with other teams and colluding are prohibited.</p>
	<p><b>Are there places I cannot go?</b></p>
	<p>
		The games have a boundary clearly defined in a map that's viewable on Google Maps. Leaving the
		boundary is typically not permitted, although this depends on the game.
	</p>
	<p>
		Places which are not accessible to everyone participating in the game may not be accessed during
		the game.
	</p>
	<p>
		If you happen to live within the game area, it is not acceptable to return to your home during
		the game, as this could give an unfair advantage to the competitors who live in the game area.
	</p>
	<h3>History, origins, and premise</h3>
	<p><b>How was the Transit Trek invented and how did it start?</b></p>
	<p>
		The Transit Trek was invented in 2023, inspired by two games: the <i
			>Seattle Transit Treasure Trek</i
		>
		created by Steven Schulte for his friends and <i>Jet Lag: The Game</i> created by Wendover
		Productions. It started after friends Arjun and Jeffrey finished Steven's puzzle- and
		transit-based <i>Trek</i> and realized they loved it and wanted to create their own version
		based on Steven's game and <i>Jet Lag</i>. The resulting Seattle Transit Trek has Steven's
		blessings and combines the transit-oriented nature of Steven's game with the dynamism and
		task-oriented game mechanics of <i>Jet Lag</i>.
	</p>
	<p>
		Occasionally, the Trek also draws comparisons to <i>The Amazing Race</i>, but we were not
		directly inspired by it. (That being said, we think it's a great TV show you should watch, as it
		can serve as inspiration for how you can succeed in the Transit Trek!)
	</p>
	<p><b>Is this a puzzle game?</b></p>
	<p>
		No, and the creators of the Transit Trek intend to keep it that way. We believe it's far more
		fun to figure out how to use public transit efficiently to complete the game, not to sit around
		and solve arcane mind-boggling puzzles.
	</p>
	<p><b>What's the difference between the Transit Trek and the Intern Game?</b></p>
	<p>
		<a href="https://en.wikipedia.org/wiki/The_Game_(treasure_hunt)">The Game</a>
		has been around for many years now. The Intern Game is a 48-hour puzzle hunt for Microsoft interns
		where you must solve puzzles to find your next clue (much like a treasure hunt) and do so by traveling
		with a car.
	</p>
	<p>
		Transit Treks do not rely on complicated puzzles. The challenge is to complete relatively doable
		challenges while figuring out how to get around efficiently using Seattle's public transit
		system.
	</p>
	<p>
		TL;DR: In the Intern Game, travel is just you solving a puzzle and they tell you where to drive.
		The puzzles are the focus, but the travel is straightforward. Whereas for the Transit Trek, the
		travel is the challenge. The challenges are meant to be simple roadblocks on the path of the
		travel; they are far less the focus.
	</p>
	<p><b>How many people have participated in the past?</b></p>
	<p>
		Transit Trek 2 featured about 45 participants. In the future, we hope to expand to accommodate a
		larger number of participants.
	</p>
	<p><b>Why does this event only take place during the summer?</b></p>
	<p>
		There are many reasons, but they all boil down to safety and accessibility. There will be ample
		daylight during the summer months that allow us to run the game when it is bright outside. That
		makes the game safer to play. The weather is nice enough in the summer that we don't have to
		worry about rain or whether it will be too cold. We'd prefer to respect your time by avoiding
		postponements of the event as best as we can. We also don't want you to get sick from doing a
		Transit Trek because it's too cold and wet outside. If we were to run them outside of the summer
		months, it would become far more difficult for us to make such guarantees. We know that you
		might already be planning on taking advantage of the good weather by going hiking or kayaking.
		That's why we are offering three different Transit Treks in 2024. Participate in one, two, or
		all three of them&mdash;it's up to you!
	</p>
	<p><b>Why should I participate in the Transit Trek?</b></p>
	<ol>
		<li>Dozens of participants have had lots of fun competing in past Transit Treks!</li>
		<li>
			The game is very environmentally friendly because everyone is required to travel either on
			foot or by existing public transit routes, which would run regardless of whether the Transit
			Trek occurred on that day or not. You can play without any guilt about creating unnecessary
			carbon emissions!
		</li>
		<li>
			It's only half a day on a Saturday, so you don't need to dedicate your whole weekend to it.
		</li>
		<li>
			It's basically free to participate. There's a requirement to buy a bandana, but it's 50¢ and
			you can reuse it for future Transit Treks.
		</li>
		<li>
			No two Transit Treks are alike. The premise of the game changes each time. A team that won the
			previous Transit Trek might not repeat their feat in a future Transit Trek.
		</li>
		<li>
			Transit Treks are thoroughly planned, researched, and tested in advance. We tend to spend at
			least 20 hours planning each Transit Trek. Each Transit Trek is also analyzed from a formal
			game design perspective. We've iterated on multiple versions of Transit Treks and learned from
			mistakes in the past. We also solicit feedback at the conclusion of each Transit Trek to make
			the next one better.
		</li>
		<li>
			Last but not least, we can't emphasize enough that it's <u>so much fun</u>!
		</li>
	</ol>

	<h3>Future plans</h3>
	<p><b>Are there plans to hold Transit Treks outside of Seattle?</b></p>
	<p>
		When there is enough demand to fly out to a different city, we will do it. However, asking
		dozens of people to block off a weekend, buy plane tickets and hotels, and then fly out to a
		city with good public transit is a tall ask.
	</p>
	<p>
		Portland, Oregon and Vancouver, British Columbia are prime alternative locations where we could
		hold the Transit Trek outside of Seattle. However, each of the cities pose their own challenges.
		Portland's public transit (Tri-Met) is not as comprehensive as Seattle's, and there is almost no
		way that people would have the energy to carpool and drive to and from Portland on the same day
		while also spending 4 hours to do a Transit Trek. Vancouver arguably has better public transit
		than Seattle, but would be difficult for many to reach, as not all participants can easily cross
		the border between the United States and Canada. For these reasons, we have thus far avoided
		planning Transit Treks in those two cities.
	</p>
	<h3>Behind the scenes</h3>
	<p><b>Can we volunteer to help organize the Transit Treks?</b></p>
	<p>
		Yes of course! We invite past participants to become volunteers if they are interested in doing
		so. If you want to volunteer, be sure you've participated in at least one prior Transit Trek so
		you have the gist of what it's like.
	</p>
	<p><b>Who runs the Transit Treks?</b></p>
	<p>
		Jeffrey Wang and Arjun Pherwani are the co-creators of the Transit Trek. Jeffrey is the primary
		game author and Arjun is the team logistics coordinator. Michael Xing is the game coordinator.
	</p>
	<p><b>To whom may I direct my questions about the Transit Trek?</b></p>
	<p>You can ask Jeffrey for more details.</p>
	<p><b>Why does this website exist?</b></p>
	<p>Arjun thought Michael would not build this website. Spite is a powerful motivator.</p>

	<h2>Past Transit Treks</h2>
	<ul>
		<li>Transit Trek 1: Ballard and Fremont (May 20, 2023)</li>
		<li>Transit Trek 2: Dash from Dushma (September 16, 2023)</li>
	</ul>

	<h2>Future Transit Treks</h2>
	<ul>
		<li>Transit Trek 3: To be announced (May or June 2024)</li>
		<li>Transit Trek 4: To be announced (July 2024)</li>
		<li>Transit Trek 5: To be announced (September 2024)</li>
	</ul>
</main>

<p class="credit">
	<small
		>This page includes graphical elements <a href="http://www.freepik.com"
			>designed by Rwdd_studios / Freepik</a
		>
		and <a href="http://www.freepik.com">designed by Freepik</a>. This page also includes elements
		that are AI generated by Microsoft Designer.</small
	>
</p>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

	:global(body) {
		padding: 0;
		margin: 0;
		font-family: 'Noto Sans', 'Helvetica', sans-serif;
	}

	main {
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(10px);
		box-shadow: 0 0 15px 10px black;

		width: 90%;
		max-width: 1500px;
		margin: 15vh auto 50px auto;
		color: white;
		padding: 5vh 10vh;
		box-sizing: border-box;
		font-family: 'Noto Sans', 'Helvetica', sans-serif;
		font-size: 20px;
	}

	blockquote {
		border: 5px red solid;
		background: black;
		padding: 20px 40px;
		margin: 40px 0;
		font-size: 1.2em;

		box-shadow: 10px 10px 20px 10px black;
	}

	blockquote h3 {
		margin-top: 10px;
		font-size: 2em;
	}

	.topLogo {
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		color: rgba(255, 255, 255, 0.7);
		font-weight: 900;
		font-size: 50px;
		text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
		-webkit-text-stroke: 2px black;
		paint-order: stroke fill;

		top: 5vh;
		left: 0;
		right: 0;
	}

	.topLogo img {
		width: 100px;
		margin-right: 20px;
		opacity: 0.9;
		box-shadow: 10px 10px 5px 0 rgba(0, 0, 0, 0.5);
	}

	.date {
		color: white;
		font-weight: 900;
		font-size: 50px;
		text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
		-webkit-text-stroke: 2px black;
		paint-order: stroke fill;
		text-align: center;
	}

	.credit {
		padding: 20px 50px;
		color: white;
		max-width: 650px;

		text-shadow: black 0 0 5px;
	}

	.credit a:hover {
		text-decoration: none;
	}

	.credit a,
	.credit a:active {
		color: white;
		text-decoration: underline;
	}

	.textWrap {
		margin-top: max(calc(50vh - 12.5vw), 200px);
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

	@media (max-width: 1100px) {
		main {
			margin-top: 5vh;
			padding: 10px 25px;
		}

		blockquote h3 {
			font-size: 1.5em;
		}

		.textWrap {
			margin-top: max(calc(40vh - 12.5vw), 150px);
			height: 50vw;
		}

		.textBlurWrap svg,
		.textShadowWrap svg {
			height: 50vw;
		}

		.textBlurWrap text:nth-child(2),
		.textShadowWrap svg text:nth-child(3),
		.textShadowWrap h1 span {
			font-size: 26.25vw;
		}

		.textShadowWrap h1 {
			line-height: 13.5vw;
			transform: translateY(0.2vw);

			text-shadow: black 0 0 1.5vw;
			-webkit-text-stroke: 1.6vw black;
		}

		.textBlurWrap text:nth-child(2),
		.textShadowWrap svg text:nth-child(3) {
			transform: translateY(-3.6vw);
		}

		.textShadowWrap svg,
		.textBlurWrap,
		.textShadowWrap h1 {
			font-size: 15vw;
		}

		.textShadowWrap h1 span {
			line-height: 19.5vw;
			-webkit-text-stroke: 2.5vw black;
		}
	}

	@media (max-width: 1000px) {
		.topLogo {
			font-size: 5vw;
			-webkit-text-stroke: 0.2vw black;
		}

		.topLogo img {
			width: 10vw;
			margin-right: 2vw;
		}
	}

	@media (max-width: 700px) {
		main {
			margin-top: 10vh;
		}
	}

	@media (min-aspect-ratio: 25/9) {
		.textWrap {
			margin-top: max(5vw, 150px);
		}
	}
</style>
