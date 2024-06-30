<script lang="ts">
	import ttLogo from '$lib/images/tt-logo-blank.png';
	import wheelImg from '$lib/images/pexels-garrettmorrow-seattle.jpg';
	import pikeImg from '$lib/images/sabine-ojeil-unsplash-pike.jpg';
	import nightImg from '$lib/images/nitish-meena-unsplash-night.jpg';
	import libraryImg from '$lib/images/sylvia-yang-unsplash-library.jpg';
	import monoImg from '$lib/images/hester-qiang-unsplash-monorail.jpg';
</script>

<svelte:head>
	<title>FAQ | Transit Trek</title>
	<meta name="description" content="About the Seattle Transit Trek" />
</svelte:head>

<a href="/" class="topLogo"><img src={ttLogo} alt="" /> Seattle Transit Trek</a>

<h1>FAQ</h1>

<div class="midsection">
	<h2>Logistics</h2>
</div>
<div class="picsection" style="--url: url({wheelImg})">
	<div class="q">
		<p class="question">Does it cost money to participate?</p>
		<p>
			To join the game, you need a Transit Trek bandana. If you purchased one previously, you can
			reuse it. If you need one, it's 50¢. You'll also need an ORCA card to use Seattle public
			transit. Most of our participants work at Microsoft, where ORCA cards are fully paid for by
			the company. However, if your employer does not give you an all-expenses paid ORCA card, be
			sure the card has at least $6 to last you throughout the duration of the game.
		</p>
		<p>
			In most games, there may be challenges that require a certain amount of money to complete. We
			try to keep the amount spent per person in each game to under $20. It is sometimes possible to
			complete most challenges without spending anything, but some challenges do require you to
			spend something. We try our best to avoid making spending mandatory!
		</p>
	</div>
	<div class="q">
		<p class="question">How long is each game?</p>
		<p>
			Each game requires 1 hour before the game to prepare. The games themselves each last 4 hours.
			We typically do preparation from 1-2pm at the starting location and the game typically runs
			between 2-6pm.
		</p>
	</div>
	<div class="q">
		<p class="question">Is this a team-based or solo free-for-all game?</p>
		<p>
			Transit Treks are team-based. Team sizes are usually 4 people, although sizes of 3 to 5 are
			permitted.
		</p>
	</div>
	<div class="q">
		<p class="question">How do I participate in the Transit Trek?</p>
		<p>
			The Transit Trek Signal group is the main place where we post news about when the next Transit
			Trek will be. Ask one of the organizers or someone who's already in the Signal group for
			information on how to join. Once you are in the group, stay tuned for info on how to sign up
			for the Transit Trek.
		</p>
	</div>
	<div class="q">
		<p class="question">Do I need to work at Microsoft to participate in the Transit Trek?</p>
		<p>
			Nope! While the Transit Trek is mainly advertised for EIC Microsoft FTEs to participate, we
			also welcome Microsoft interns, Amazon employees, and other friends to join.
		</p>
	</div>
	<div class="q">
		<p class="question">Do I need to organize my own team?</p>
		<p>
			You can either form your own team of 4 participants or you can ask us to form a team for you!
			If you don't know anyone else participating, that's not a problem at all. You're still more
			than welcome to sign up!
		</p>
	</div>
	<div class="q">
		<p class="question">
			Are there past Transit Treks I can refer back to so I have an idea of what they might be like?
			Should I study up on anything?
		</p>
		<p>
			We're happy to share documents from some of the prior Transit Treks. However, keep in mind
			that the game changes each time, so looking at them will only give you some context on the
			overall premise of Transit Treks; it won't help you get a leg up on the upcoming game.
		</p>
		<p>
			The only thing you should absolutely study up on is the public transit network within the game
			area of the upcoming Transit Trek. While you are always welcome to use Google Maps to plan
			your journey, it'll serve you better if you know what routes exist ahead of time.
		</p>
	</div>
	<div class="q">
		<p class="question">What is the timeline of signing up and preparing for a Transit Trek?</p>
		<p>
			We tend to finalize the date and the theme of the game about one month ahead, but sometimes we
			might <s>procrastinate</s> be a bit more pressed for time, depending on the situation. Around this
			time, you'll need to sign up for the Transit Trek. The cutoff to sign up will usually be one week
			before the day of the Trek. This gives us enough time to create and assign teams.
		</p>
		<p>
			The full list of challenges will only be released when the game starts at 2pm on the day of
			the Trek.
		</p>
	</div>
	<div class="q">
		<p class="question">How accessible is the game?</p>
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
				Alcohol challenges are sometimes offered as a fun alternative for participants over the age
				of 21, but there will not be any cases where a team will be required to do an alcohol
				challenge to have a chance of winning.
			</li>
			<li>
				Running for long distances is typically not permitted. Not everyone can run a 5K, and you're
				not expected to be in peak physical condition shape to be able to win this game!
			</li>
			<li>
				Prior knowledge should rarely help with completing challenges. It's assumed you have some
				basic pop culture context that most Americans have, but even if you don't, you can search
				the web to figure things out. For instance, we would never create a challenge where you are
				supposed to decipher Chinese characters. That would be unfair to anyone who doesn't already
				know Chinese because they would spend longer figuring it out than participants who can read
				Chinese. (The one exception is your prior knowledge of the public transit of Seattle. The
				better you know the Seattle public transit system before the game, the better off you will
				fare during the game.)
			</li>
		</ul>
	</div>
</div>

<div class="midsection">
	<h2>Game Rules</h2>
	<p>
		Most game rules differ between each game. However, there are some rules that always remain
		constant. They are explained below in great detail (to ensure there is no ambiguity when the
		game is played).
	</p>
</div>
<div class="picsection" style="--url: url({pikeImg})">
	<div class="q">
		<p class="question">What can I travel on during the Transit Trek?</p>
		<p>
			You can either travel as a pedestrian or on public transit. The forms of public transit
			permitted are: (1) anything either branded as Sound Transit or operated by King County Metro,
			(2) the Seattle Center Monorail, and (3) the Seattle Streetcars.
		</p>
		<p>
			An easy way to tell if you can travel on a mode of transportation or not is: do they accept
			ORCA cards and accept ORCA regional day or monthly passes? If so, you can use it!
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
			Washington State Ferries technically accept ORCA cards but they do not accept ORCA regional
			day or monthly passes, so they are prohibited. Also, they do not serve intra-Seattle routes,
			so as a practical matter, they aren't allowed.
		</p>
	</div>
	<div class="q">
		<p class="question">Can I get outside help?</p>
		<p>
			Using Google Maps, a search engine, or a chatbot is usually allowed unless expressly
			prohibited.
		</p>
		<p>Intentional communication with other teams and colluding are prohibited.</p>
	</div>
	<div class="q">
		<p class="question">Are there places I cannot go?</p>
		<p>
			The games have a boundary clearly defined in a map that's viewable on Google Maps. Leaving the
			boundary is typically not permitted, although this depends on the game.
		</p>
		<p>
			Places which are not accessible to everyone participating in the game may not be accessed
			during the game.
		</p>
		<p>
			If you happen to live within the game area, it is not acceptable to return to your home during
			the game, as this could give an unfair advantage to the competitors who live in the game area.
		</p>
	</div>
</div>

<div class="midsection">
	<h2>History, Origins, and Premise</h2>
</div>
<div class="picsection" style="--url: url({monoImg})">
	<div class="q">
		<p class="question">How was the Transit Trek invented and how did it start?</p>
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
			directly inspired by it. (That being said, we think it's a great TV show you should watch, as
			it can serve as inspiration for how you can succeed in the Transit Trek!)
		</p>
	</div>
	<div class="q">
		<p class="question">Is this a puzzle game?</p>
		<p>
			No, and the creators of the Transit Trek intend to keep it that way. We wanted to create a
			game more focused on figuring out how to use public transit efficiently to complete the game,
			instead of solving mind-boggling puzzles.
		</p>
	</div>
	<div class="q">
		<p class="question">What's the difference between the Transit Trek and the Intern Game?</p>
		<p>
			<a href="https://en.wikipedia.org/wiki/The_Game_(treasure_hunt)">The Game</a>
			has been around for many years now. The Intern Game is a 48-hour puzzle hunt for Microsoft interns
			where you must solve puzzles to find your next clue (much like a treasure hunt) and do so by traveling
			with a car.
		</p>
		<p>
			Transit Treks do not rely on complicated puzzles. The challenge is to complete relatively
			doable challenges while figuring out how to get around efficiently using Seattle's public
			transit system.
		</p>
		<p>
			TL;DR: In the Intern Game, travel is just you solving a puzzle and they tell you where to
			drive. The puzzles are the focus, but the travel is straightforward. Whereas for the Transit
			Trek, the travel is the challenge. The challenges are meant to be simple roadblocks on the
			path of the travel; they are far less the focus.
		</p>
	</div>
	<div class="q">
		<p class="question">How many people have participated in the past?</p>
		<p>
			Transit Trek 2 featured about 45 participants. In the future, we hope to expand to accommodate
			a larger number of participants.
		</p>
	</div>
	<div class="q">
		<p class="question">Why does this event only take place during the summer?</p>
		<p>
			There are many reasons, but they all boil down to safety and accessibility. There will be
			ample daylight during the summer months that allow us to run the game when it is bright
			outside. That makes the game safer to play. The weather is nice enough in the summer that we
			don't have to worry about rain or whether it will be too cold. We'd prefer to respect your
			time by avoiding postponements of the event as best as we can. We also don't want you to get
			sick from doing a Transit Trek because it's too cold and wet outside. If we were to run them
			outside of the summer months, it would become far more difficult for us to make such
			guarantees. We know that you might already be planning on taking advantage of the good weather
			by going hiking or kayaking. That's why we are offering three different Transit Treks in 2024.
			Participate in one, two, or all three of them&mdash;it's up to you!
		</p>
	</div>
	<div class="q">
		<p class="question">Why should I participate in the Transit Trek?</p>
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
				It's very cheap to participate. There's a requirement to buy a bandana, but it's 50¢ and you
				can reuse it for future Transit Treks.
			</li>
			<li>
				No two Transit Treks are alike. The premise of the game changes each time. A team that won
				the previous Transit Trek might not repeat their feat in a future Transit Trek.
			</li>
			<li>
				Transit Treks are thoroughly planned, researched, and tested in advance. We tend to spend at
				least 20 hours planning each Transit Trek. Each Transit Trek is also analyzed from a formal
				game design perspective. We've iterated on multiple versions of Transit Treks and learned
				from mistakes in the past. We also solicit feedback at the conclusion of each Transit Trek
				to make the next one better.
			</li>
			<li>
				Last but not least, we can't emphasize enough that it's <u>so much fun</u>!
			</li>
		</ol>
	</div>
</div>

<div class="midsection">
	<h2>Future Plans</h2>
</div>
<div class="picsection" style="--url: url({nightImg})">
	<div class="q">
		<p class="question">Are there plans to hold Transit Treks outside of Seattle?</p>
		<p>
			When there is enough demand to fly out to a different city, we will do it. However, asking
			dozens of people to block off a weekend, buy plane tickets and hotels, and then fly out to a
			city with good public transit is a tall ask.
		</p>
		<p>
			Portland, Oregon and Vancouver, British Columbia are prime alternative locations where we
			could hold the Transit Trek outside of Seattle. However, each of the cities pose their own
			challenges. Portland's public transit (Tri-Met) is not as comprehensive as Seattle's, and
			there is almost no way that people would have the energy to carpool and drive to and from
			Portland on the same day while also spending 4 hours to do a Transit Trek. Vancouver arguably
			has better public transit than Seattle, but would be difficult for many to reach, as not all
			participants can easily cross the border between the United States and Canada. For these
			reasons, we have thus far avoided planning Transit Treks in those two cities.
		</p>
	</div>
</div>

<div class="midsection">
	<h2>Behind the Scenes</h2>
</div>
<div class="picsection" style="--url: url({libraryImg})">
	<div class="q">
		<p class="question">Can we volunteer to help organize the Transit Treks?</p>
		<p>
			Yes of course! We invite past participants to become volunteers if they are interested in
			doing so. If you want to volunteer, be sure you've participated in at least one prior Transit
			Trek so you have the gist of what it's like.
		</p>
	</div>
	<div class="q">
		<p class="question">Who runs the Transit Treks?</p>
		<p>
			Jeffrey Wang and Arjun Pherwani are the co-creators of the Transit Trek. Jeffrey is the
			primary game author and Arjun is the team logistics coordinator. Michael Xing is the game
			coordinator.
		</p>
	</div>
	<div class="q">
		<p class="question">To whom may I direct my questions about the Transit Trek?</p>
		<p>You can ask Jeffrey for more details.</p>
	</div>
	<div class="q">
		<p class="question">Why does this website exist?</p>
		<p>Arjun thought Michael would not build this website. Spite is a powerful motivator.</p>
	</div>
</div>

<div class="midsection credit">
	<p>
		This page includes photography by
		<a href="https://www.pexels.com/photo/space-needle-seattle-944636/" target="_blank"
			>Zoe Pappas</a
		>
		and
		<a
			href="https://www.pexels.com/photo/photo-of-white-ferris-wheel-across-city-buildings-2322707/"
			target="_blank">Garrett Morrow</a
		>
		on Pexels, as well as photography by
		<a href="https://unsplash.com/photos/man-in-brown-jacket-statue-7mH9jwVVwSg" target="_blank"
			>Hester Qiang</a
		>,
		<a href="https://unsplash.com/photos/book-lot-on-shelf-_ar2ENzmqb0" target="_blank"
			>Sylvia Yang</a
		>,
		<a
			href="https://unsplash.com/photos/city-buildings-under-blue-sky-photography-1mFSRB6SBQw"
			target="_blank">Nitish Meena</a
		>, and
		<a href="https://unsplash.com/photos/public-market-center-signage-xsqF178XAhk" target="_blank"
			>Sabine Ojeil</a
		> on Unsplash.
	</p>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

	:global(body) {
		padding: 0;
		margin: 0;
		font-family: 'Noto Sans', 'Helvetica', sans-serif;
	}

	.topLogo {
		text-decoration: none;
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		color: rgba(255, 255, 255, 0.85);
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

	.q .question {
		font-size: 1.5em;
		font-weight: bold;
	}

	.q a {
		color: white;
	}

	.q a:hover,
	.q a:focus {
		text-decoration: none;
	}

	.q a:active {
		text-decoration: underline;
	}

	h1 {
		padding: 30vh 0 20vh 0;
		text-align: center;
		font-weight: 900;
		font-size: 200px;
		margin: 0;
		background-position: center;
		background-attachment: fixed;
		background-size: cover;
		background-image: url($lib/images/pexels-zoedoingthings-944636.jpg);
		color: white;

		text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
		-webkit-text-stroke: 20px black;
		paint-order: stroke fill;
	}

	.midsection {
		/* background: linear-gradient(to bottom right, #f24d69, #e53935); */
		background: linear-gradient(to bottom right, #880e4f, #4a148c);
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
		z-index: 1;
	}

	.picsection .q .question {
		font-size: 30px;

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
		background: rgba(0, 0, 0, 0.65);
		backdrop-filter: blur(5px);
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 80%);
	}

	.picsection::after {
		z-index: -2;

		background-image: var(--url);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
	}

	.picsection .q {
		width: 60%;
		max-width: 800px;
	}

	@media (max-width: 800px) {
		.picsection::before {
			z-index: -1;
			background: rgba(0, 0, 0, 0.5);
			backdrop-filter: blur(5px);
			mask-image: unset;
		}

		.picsection .q {
			width: 100%;
			max-width: unset;
		}
	}

	@media (max-width: 600px) {
		.picsection {
			padding-left: 10%;
			padding-right: 10%;
		}

		h1 {
			font-size: 150px;
		}
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
</style>
