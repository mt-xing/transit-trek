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
	<title>Transit Trek: Race Across Seattle</title>
	<meta name="description" content="Seattle Transit Trek's May 2024 event, Race Across Seattle" />
</svelte:head>

<div id="bgImg" style="background-position: 50% {parallaxY * 100}%"></div>

<div class="topLogo"><img src={ttLogo} alt="" /> Seattle Transit Trek</div>

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

<p class="date">May 2024 (Date TBD)</p>

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

	<h2>Rules</h2>
	<h3>Basic Gameplay Logistics</h3>
	<ul>
		<li>
			The objective of the game is to get from the starting point to the pit stop via public transit
			as quickly as you can.
		</li>
		<li>
			In order to take modes of public transit, each team needs to earn passes to take a certain
			mode of transportation or a certain route.
		</li>
		<li>
			Once passes are earned, they are forever valid for unlimited two-way travel between the origin
			and destination.
		</li>
		<li>
			Every player (that’s you!; also known as a Transit Trekker) must have a fully charged mobile
			phone with Signal installed.
			<ul><li>Signal will be used to communicate between participants and the organizers.</li></ul>
		</li>
		<li>At least one Transit Trekker in the team must have an iPhone with Find My Friends.</li>
		<li>
			Every Transit Trekker must be wearing a bandana provided by the organizers. This way, you can
			easily be identified as a participant.
		</li>
		<li>
			For tracking purposes, one team member needs to share their location with the organizers on
			Find My Friends.
		</li>
		<li>
			Players must travel by foot or public transit where they can use their ORCA card. This
			includes Link light rail, all public buses, streetcars/trams, and the Seattle Monorail.
			<ul>
				<li>
					Absolutely no traveling on cars, motorcycles, trucks, boats, planes, bicycles, scooters,
					or Segways. Doing so could result in penalties up to/including disqualification.
				</li>
			</ul>
		</li>
		<li>
			There are a few zones where you cannot cross on foot. They are called pedestrian exclusion
			zones. They are listed at the bottom of this document. You are welcome to walk on the streets
			listed as part of the pedestrian exclusion zones, but cannot cross them in order to progress
			further in the game. You can only use public transit to get across those zones.
			<ul>
				<li>
					Any violations of the pedestrian exclusion zones will result in a 30 minute penalty for
					each violation.
				</li>
			</ul>
		</li>
		<li>
			Running is only allowed to catch public transit (if it’s about to depart) or if you are within
			sight of the pit stop. Everyone’s bodies are built differently and not all of us have bodies
			well suited to running long distances. To ensure fairness, please do not run at any other
			point of the game.
		</li>
		<li>Team members must stay together (within 10 feet of each other) at all times.</li>
		<li>
			Transit Trekkers must stay within the bounds of the game.
			<ul>
				<li>
					Because it is not fair to exit the bounds of the game, teams will have 1 point deducted
					for each violation detected.
				</li>
			</ul>
		</li>
		<li>
			You get one 10 minute bio break. If you don’t take it, a 10 minute penalty will be given to
			you when you arrive at the finish line.
			<ul>
				<li>
					For instance, if you take a bio break and you arrive at 5:30pm, your game time counts as 3
					hours 30 minutes. However, if you don’t take a bio break and you arrive at 5:30pm, your
					game time counts as 3 hours 40 minutes.
				</li>
				<li>You have to tell us when you are starting and ending the bio break.</li>
			</ul>
		</li>
		<li>
			You cannot take a bio break while doing a task and you cannot do any tasks when taking a bio
			break. You are, however, allowed to strategize during the bio break.
		</li>
		<li>
			In case a bio break takes longer than 10 minutes, please inform the organizers so they can
			keep track of your team’s situation. Health and safety always come first, but it’s important
			for the organizers to keep track of exceptional circumstances affecting gameplay.
		</li>
	</ul>

	<h3>Completing Challenge Tasks</h3>
	<ul>
		<li>The list of tasks are in the last portion of this document.</li>
		<li>
			Tasks earn you passes. Passes allow you to go to a specific place, sometimes with a limitation
			on where they can be used from.
		</li>
		<li>
			To officially complete a task, they must be reported to the organizers via Signal as soon as
			they are completed (for verification and tabulation purposes).
			<ul>
				<li>
					If a task requires you to complete multiple stages/steps, don’t report it to the
					organizers until all stages/steps of that task are complete.
				</li>
				<li>However, if you complete a task in its entirety, you must report it immediately.</li>
				<li>
					You won’t receive your pass to move on to the next part until the organizers inform your
					team you’ve successfully completed the task.
				</li>
				<li>
					If the organizers inform the team that their task was not successfully completed, the
					organizers will not inform the team of what they did incorrectly, and the team may try to
					repeat the task at most two more times. After that, they cannot continue attempting to
					complete the task and must try another task.
				</li>
			</ul>
		</li>
		<li>
			Whenever possible, tasks may be completed simultaneously with other tasks, but team members
			cannot split up in order to accomplish multiple tasks simultaneously. Instead, you can start
			one task and keep it going while you start on another.
		</li>
		<li>
			You may be required to make small purchases under $20 throughout the game to complete certain
			tasks (ORCA card taps don’t count as purchases). These tasks will be clearly marked with a
			dollar sign and alternative tasks will be available to allow you to avoid paying. You will not
			be reimbursed for any monetary costs associated with completing the task.
		</li>
		<li>
			If a task requires a certain item, it must be purchased after the game starts. Items you have
			with you won’t count unless explicitly permitted by the task.
		</li>
		<li>
			If a task requires pictures as proof (which almost all of them do), all team members must be
			in the picture (as a selfie) unless explicitly not required. When in doubt, ask the
			organizers.
		</li>
		<li>
			If a task says you can’t look something up, it means you also can’t ask a non-participating
			person to look it up for you or tell you the answer.
		</li>
		<li>
			<strong>
				If you are not sure about what counts as successfully completing a task, ask the organizers.
			</strong>
			Failure to ask may result in you not earning the points if your actions don’t qualify as properly
			completing the task.
		</li>
		<li>
			If a task requires each team member to procure something, then teams which have more members
			than other teams only need to get the number of items equivalent to the smallest team’s size.
			For instance, if the smallest team size is 4, then teams of 5 will only need to get 4 items.
		</li>
		<li>
			When completing tasks, please do not do anything that might lead to danger.
			<strong>Safety first.</strong>
			If you are concerned that you or other teams completing a task may result in harm, please contact
			the organizers immediately. They may issue a notice to everyone that a certain task is removed
			from the game due to safety concerns.
		</li>
		<li>
			<strong>
				Be sure, when communicating with organizers, that you tell them what you are sending
				evidence for.
			</strong>
		</li>
	</ul>

	<h3>Interacting with Other Teams</h3>
	<ul>
		<li>
			Teams may not have any intentional contact with each other during the game, unless they see
			each other in person, or as otherwise specified in the rules.
		</li>
	</ul>

	<h3>Concluding the Game</h3>
	<ul>
		<li>
			Teams should aim to arrive at the pit stop as quickly as possible (of course, as this is a
			race!), but they need to make sure they are there by the end of the game, or they might not be
			eligible to be ranked.
		</li>
		<li>
			If teams have not reached Pioneer Square or the International District by 5:45pm, they will be
			required to take the fastest public transit from wherever they are to Chinatown/International
			District and go to Hing Hay Park.
		</li>
		<li>At the end of the game, teams will be ranked by how quickly they arrived.</li>
		<li>All times are reported in U.S. Pacific Daylight Time.</li>
		<li>
			Clarifications are issued by the organizers and are final. When appropriate, the
			clarifications will be announced to all teams, not just yours.
		</li>
		<li>
			Tiebreaking rules
			<ul>
				<li>
					The number of rules broken will be the first to break ties, with fewer rule violations
					giving higher priority. This excludes rules that give an explicit time penalty.
				</li>
				<li>
					Second, the time penalties are factored in. This may include a failure to take a bio break
					or crossing the pedestrian exclusion zones.
				</li>
				<li>
					Third, a team who successfully completed more challenges and earned more passes through
					the course of the game will be given higher priority.
				</li>
				<li>
					All else failing, then it’s a fight to the death with rock paper scissors, best out of 3.
				</li>
			</ul>
		</li>
	</ul>

	<h3>Miscellaneous</h3>
	<ul>
		<li>
			Rules can be changed by the organizers at any time before, during, and after the competition
			period. Whatever the organizers say can override any of the written rules. Rule changes will
			be clearly broadcasted on the Signal group.
		</li>
	</ul>

	<h3>Game Zone and Game Boundaries</h3>
	<p>To be announced at a later time</p>

	<h3>Starting Point</h3>
	<p>
		Show up to Northgate Station <strong>by 1:00pm</strong>. Parking is available at this park and
		ride location, though this tends to be a popular park and ride garage, so you may wish to park
		at the Amazon Spheres and take the Link over to Northgate if you think that’d be more
		convenient. The rules will be explained and participants will have the opportunity to ask
		clarifying questions to the organizers before the game starts. You will also have the chance to
		meet your team and discuss basic strategy. The game will begin when everyone is present and the
		organizers announce the start. Take your time or hurry up. The choice is yours;
		<strong>don’t be late!</strong>
	</p>
	<p>
		One member of your team should be designated as the primary representative, who will be
		responsible for communicating with the organizers.
	</p>

	<h3>Ending Point</h3>
	<p>The ending point will be Hing Hay Park in Chinatown.</p>

	<h3>Starting Procedures</h3>
	<ul>
		<li>Pick a name for your team</li>
		<li>Pick a representative for the team, who will share their location with the organizers</li>
		<li>
			Get your bandana! (and pay for it if you haven’t already)
			<ul>
				<li>Does not apply if you are bringing your bandana from the last Transit Trek</li>
			</ul>
		</li>
		<li>Read the rules and ask questions to the organizers for clarification</li>
		<li>Decide as a team what the strategy is and how to start</li>
	</ul>

	<blockquote>
		<h3>Safety Disclaimer</h3>
		<p>
			You (a Participant) and your safety are of paramount importance during your participation in
			the Seattle Transit Trek (the “Game”). You are strongly advised to avoid areas that may
			present imminent danger to you or your fellow Participants. In case a diversion needs to be
			made, you should report it to the Organizers and appropriate compensation in terms of points
			and/or time will be made for you, including but not limited to, bonus points, the waiver of a
			late return penalty, etc.
		</p>
		<p>
			You may also not engage in any illegal activity to gain an unfair advantage in the Game. Doing
			so will result in penalties including/up to disqualification.
		</p>
		<p>
			By participating in the Game, you agree that you are playing the Game at your own risk. You
			furthermore agree to hold the Organizers harmless and hold your fellow Participants harmless,
			even by the negligence of the Organizers or fellow Participants.
		</p>
		<p>
			<strong>
				IN NO EVENT WILL THE ORGANIZERS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT,
				INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES ARISING FROM
				YOUR PARTICIPATION IN THIS GAME, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
				DAMAGES. BY PARTICIPATING IN THIS GAME, YOU HEREBY WAIVE, RELEASE, AND DISCHARGE THE
				ORGANIZERS AND THEIR AGENTS OF ANY AND ALL LIABILITY OR DAMAGES OF ANY KIND RELATED TO,
				ARISING FROM, OR IN ANY WAY CONNECTED WITH, YOUR PARTICIPATION IN THIS GAME, INCLUDING THOSE
				ALLEGEDLY ATTRIBUTED TO THE NEGLIGENT ACTS OR OMISSIONS OF THE AFOREMENTIONED PARTIES.
			</strong>
		</p>
	</blockquote>
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

		.date {
			margin: 0;
			transform: translateY(-5vh);
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
		.topLogo,
		.date {
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
