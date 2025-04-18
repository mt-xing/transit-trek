<script lang="ts">
	import BigBtn from '../../components/bigBtn.svelte';
	import SmallBtn from '../../components/smallBtn.svelte';
	import TopLogo from '../../components/topLogo.svelte';
	import { HOME_PAGE } from '../../utils/paths';

	import main_bg from '$lib/images/ett1/ett1_web_bg.png';
	import narrow_bg from '$lib/images/ett1/ett1_web_narrow.png';

	const PARTIFUL_LINK = 'https://partiful.com/e/1B9zb9hUfnIKtEcq4Rmc';
</script>

<svelte:head>
	<title>Eastside Transit Trek</title>
	<meta name="description" content="Seattle Transit Trek's first ever Eastside Transit Trek" />
</svelte:head>

<div id="outerWrap">
	<div id="headerBg"></div>
	<TopLogo
		customStyles="text-shadow: none; opacity: 1; font-family: Noto Sans, Helvetica, sans-serif; top: 2vh; color: white;"
		customImgStyles="box-shadow: none;"
	/>

	<section class="hero">
		<img src={main_bg} id="wide_bg" alt="" />
		<img src={narrow_bg} id="narrow_bg" alt="" />
		<h1>Eastside Transit Trek</h1>
		<h2 class="date">April 12, 2025</h2>
	</section>

	<div class="textwrap card first">
		<p>
			Seattle Transit Trek proudly presents our first ever transit trek on the Eastside!
			<br />
			Explore Bellevue and Redmond as you hop on transit, complete challenges, and compete to see who
			can earn the most points! This is a full-on competitive scavenger hunt at city-sized scale.
		</p>
	</div>

	<div class="signupWrap">
		<p>Ready to Trek?</p>
		<p>
			<BigBtn
				isBlack={true}
				href={PARTIFUL_LINK}
				text="Sign Up"
				color={['rgb(128,255,255)', 'rgb(200,255,255)']}
				customStyles="text-shadow: none; -webkit-text-stroke: unset; box-shadow: none; color: black; font-family: ClearSansBold, Arial, sans-serif; font-size: 30px;"
			/>
		</p>
	</div>

	<div class="card" style="margin-top: 100px;">
		<p>
			Transit Treks are part scavenger hunt, part games of skill, strategy, and pure dumb luck
			played across the Puget Sound.
			<SmallBtn href={HOME_PAGE} text="Learn More" isBlack={true} />
		</p>
		<p style="margin-top: 2vw;">
			Read on for detailed game rules, instructions, and important notices.
		</p>
	</div>

	<div class="beginLine" />

	<details>
		<summary><h2>Requirements</h2></summary>
		<ul>
			<li>
				ORCA card with either a pass or at least $12 loaded on it<br />
				<small>Microsoft- and Amazon-issued ORCA cards suffice for this requirement</small>
			</li>
			<li>
				A smartphone<br />
				<small>One team member must have an iPhone with Find My enabled</small>
			</li>
			<li>Joined the Signal group</li>
			<li>
				Either:
				<ul>
					<li>A bandana from a prior Seattle Transit Trek and a $5 participation fee, or</li>
					<li>
						A $5.50 participation fee. In return, you will be given a bandana to be used throughout
						the game (and to keep as a souvenir and for future Transit Treks!)
					</li>
					<li>
						Roughly 24-48 hours before the event begins, the participation fee may be raised to be
						higher than $5.50 because of the increased work we have to do to arrange teams
						last-minute. Please try your best to register early; we appreciate it!
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
		</ul>
	</details>

	<details>
		<summary>
			<h2>Basics</h2>
		</summary>
		<ul>
			<li>Each task is worth a certain number of points</li>
			<li>Most tasks are relatively close to public transit stations</li>
			<li>3 to 4 people per team</li>
			<li>4 hours long competition period</li>
		</ul>
		<p>
			For more general information about all Transit Treks, please see:<br />
			<a href="https://www.transittrek.org/about">the about/FAQ page</a>.
		</p>
	</details>

	<details>
		<summary>
			<h2>Rules</h2>
		</summary>

		<h3>Basic Gameplay Logistics</h3>
		<ul>
			<li>The objective of the game is to earn as many points as possible in the allotted time.</li>
			<li>
				Every player (that’s you!; also known as a Transit Trekker) must have a fully charged mobile
				phone with Signal installed.
				<ul>
					<li>Signal will be used to communicate between participants and the organizers.</li>
				</ul>
			</li>
			<li>At least one player in the team must have an iPhone with Find My Friends.</li>
			<li>Every player must be wearing a bandana provided by the organizers.</li>
			<li>
				For tracking purposes, one team member needs to share their location with the organizers on
				Find My (formerly known as Find My Friends).
			</li>
			<li>
				Players must travel by foot or public transit operated by the City of Seattle, the Seattle
				Monorail, King County Metro, or branded as Sound Transit.
				<ul>
					<li>
						Absolutely no traveling on cars, trucks, boats, planes, bikes, scooters, or Segways.
						Doing so could result in penalties up to / including disqualification.
					</li>
				</ul>
			</li>
			<li>Players must stay within the bounds of the game.</li>
			<li>
				Each team is required to take a 10 minute food/bio break sometime between the beginning of
				the 2nd hour and end of the 3rd hour. Failure to do so will result in disqualification.
			</li>
			<li>
				In case a bio break takes longer than 10 minutes, please inform the organizers so they can
				keep track of your team’s situation. Health and safety always come first, but it’s important
				for the organizers to keep track of exceptional circumstances affecting gameplay.
			</li>
		</ul>

		<h3>Completing Challenge Tasks</h3>
		<ul>
			<li>The list of tasks will be provided once the game starts.</li>
			<li>
				There are two types of challenges that will earn you points:
				<ul>
					<li>
						<strong>Tasks.</strong> Follow the instructions provided. May require being at a specific
						location, potentially at a specific time.
					</li>
					<li>
						<strong>Find This.</strong> Within the game area, try to find where a given picture was taken.
					</li>
				</ul>
			</li>
			<li>Team members must stay together (within 10 feet of each other) at all times.</li>
			<li>
				To officially complete a task, they must be reported to the organizers via Signal as soon as
				they are completed (for verification and tabulation purposes).
				<ul>
					<li>
						If a task requires you to complete multiple stages/steps, you may report each stage/step
						to the organizers separately.
					</li>
					<li>
						However, if you complete a task in its entirety, you must report it immediately. If you
						don’t report it within 5 minutes of completing it, you won’t be eligible for earning
						points on that task.
					</li>
					<li>
						If the organizers inform the team that their task was not successfully completed, the
						organizers will not inform the team of what they did incorrectly, and the team may try
						to repeat the task at most two more times. After that, they cannot continue attempting
						to complete the task and must try another task.
					</li>
				</ul>
			</li>
			<li>Tasks may be completed simultaneously with other tasks.</li>
			<li>
				If a task requires a certain item, it must be purchased after the game starts. Items you
				have with you won’t count unless explicitly permitted by the task.
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
				If you are not sure about what counts for a task, ask the organizers. Failure to ask may
				result in you not earning the points if your actions don’t qualify as properly completing
				the task.
			</li>
			<li>
				If a task requires each team member to procure something, then teams which have more members
				than other teams only need to get the number of items equivalent to the smallest team’s
				size. For instance, if the smallest team size is 4, then teams of 5 will only need to get 4
				items.
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

		<h3>Interacting With Other Teams</h3>
		<ul>
			<li>
				Teams may not have any intentional contact with each other during the game, unless they see
				each other in person, or as otherwise specified in the rules.
			</li>
		</ul>

		<h3>Concluding the Game</h3>
		<ul>
			<li>
				Teams must arrive at the pit stop by the designated end time of the game, as determined by
				the organizers. If they do not arrive at the pit stop on time, a points penalty will be
				assessed based on the following rules:
				<ul>
					<li>Being late will result in a deduction of 5 points</li>
					<li>
						For every minute a team is late, an additional 1 point will be deducted from their
						overall score
					</li>
				</ul>
			</li>
			<li>At the end of the game, teams will be ranked by how many points they earned.</li>
			<li>All times are reported in U.S. Pacific Daylight Time.</li>
			<li>
				Clarifications are issued by the organizers and are final. When appropriate, the
				clarifications will be announced to all teams, not just yours.
			</li>
			<li>
				Tiebreaking rules
				<ul>
					<li>
						The amount of rules broken will be the first to break ties, with fewer rule violations
						giving higher priority
					</li>
					<li>
						Next, a team who successfully completed more challenges will be given higher priority
					</li>
					<li>
						All else failing, then it’s a fight to the death with rock paper scissors, best out of
						3.
					</li>
				</ul>
			</li>
		</ul>

		<h3>Miscellaneous</h3>
		<ul>
			<li>
				You must obey all applicable laws, regulations, and rules during the game. (To be fair, it's
				probably also smart to obey laws outside the game.). <strong
					>This includes jaywalking.</strong
				>
			</li>
			<li>
				You must correctly pay the fare when taking transit. Note you no longer need to tap off of
				the Link.
			</li>
			<li>
				You may not obstruct any transit from operating along its normal schedule (by, for example,
				holding the doors open as they're closing).
			</li>
			<li>
				You may be filmed during the game for future promotional purposes unless you explicitly ask
				us not to film you.
			</li>
			<li>
				Rules can be changed by the organizers at any time before, during, and after the competition
				period. Whatever the organizers say can override any of the written rules. Rule changes will
				be clearly broadcasted on the Signal group.
			</li>
		</ul>
	</details>

	<details>
		<summary><h2>Game Zone + Boundaries</h2></summary>
		<p>
			The map linked below shows the official game boundaries:<br />
			<a
				href="https://www.google.com/maps/d/edit?mid=1ZjdJiiigXPSlK5A53keaGrNxIp6iocM&usp=sharing"
				target="_blank">Game Boundaries</a
			>
		</p>
		<p>
			The game will not require you to leave the marked zone. You may not complete challenges
			outside of the game area.
		</p>
	</details>

	<details>
		<summary><h2>Starting Point</h2></summary>
		<p>
			Show up to Bel-Red Station <strong>by 1:00pm</strong>. Free parking is available at the
			station's parking lot. You can also park at Redmond Technology or South Bellevue Station, for
			free, in the Sound Transit parking garages. If you're coming from Seattle, you can consider
			taking a Sound Transit express bus that connects with a 2 Line station and then ride the 2
			Line to Bel-Red Station. The rules will be explained and participants will have the
			opportunity to ask clarifying questions to the organizers before the game starts. You will
			also have the chance to meet your team and discuss basic strategy. The game will begin when
			everyone is present and the organizers announce the start. Take your time or hurry up. The
			choice is yours; <strong>don’t be late!</strong>
		</p>
		<p>
			One member of your team should be designated as the primary representative, who will be
			responsible for communicating with the organizers. In addition, one member of the team (who
			may also be the primary representative) must share their location with the chasers. They will
			then be able to see the chasers’ locations too.
		</p>
	</details>

	<details>
		<summary><h2>Ending Point</h2></summary>
		<p>
			The ending point will be at the northeast corner of Bellevue Downtown Park, as marked on the
			game map. Be sure to show up there by <strong>6:00pm</strong>. We will hold the award
			ceremonies there.
		</p>
	</details>

	<details>
		<summary><h2>Starting Procedures</h2></summary>
		<ol>
			<li>Sign in with the organizers</li>
			<li>Listen to the logistics overview</li>
			<li>Pick a name for your team</li>
			<li>Pick a representative for the team, who will share their location with the organizers</li>
			<li>Get your bandana! (and pay for it if you haven’t already)</li>
			<li>Read the rules and ask questions to the organizers for clarification</li>
			<li>Take a group picture!</li>
			<li>Decide as a team what the strategy is and how to start</li>
		</ol>
	</details>

	<details class="last">
		<summary><h2>Live Scoreboard</h2></summary>
		<p>You can keep track of the score on your team dashboard.</p>
	</details>

	<div class="endLine" />

	<blockquote class="card disclaimer">
		<h3>⚠️ Safety Disclaimer</h3>
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

	<div class="card wide ack">
		<h2 style="text-align: center;">Acknowledgements</h2>
		<p>Thank you to all of the people who worked to make the Seattle Transit Trek possible!</p>
		<ul>
			<li>
				<strong>Michael Xing</strong>: Game coordinator, author of the Transit Trek web app,
				Eastside Transit Trek 1 editor, Transit Trek co-organizer
			</li>
			<li>
				<strong>Arjun Pherwani</strong>: Doubter of Michael Xing, co-creator of the Transit Trek,
				team logistics coordinator, Transit Trek co-organizer
			</li>
			<li>
				<strong>Steven Schulte</strong>: Original inspiration for the Transit Trek, world record
				holder for ‘getting caught the most in a Transit Trek game’
			</li>
			<li>
				<strong>Jet Lag: The Game</strong>: Inspiration for Transit Trek games
			</li>
			<li>
				<strong>You, the Transit Trekker!</strong> Thank you for participating and making this Transit
				Trek a success.
			</li>
		</ul>
		<p>
			Sincerely,<br /><strong>Jeffrey Wang</strong><br />Eastside Transit Trek 1 author, co-creator
			of the Transit Trek, Transit Trek co-organizer
		</p>
	</div>
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	@font-face {
		font-family: 'ClearSansBold';
		src: url('/ett1/ClearSans-Bold.ttf');
	}

	@font-face {
		font-family: 'ClearSans';
		src: url('/ett1/ClearSans-Regular.ttf');
	}

	#outerWrap {
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		overflow-x: hidden;
		overflow-y: hidden;
		background: white;
		color: black;

		font-family: 'ClearSans', 'Arial', sans-serif;
	}

	#headerBg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: min(calc(100px + 4vh), calc(10vw + 4vh));
		background: #f24e69;
		z-index: 5;
	}

	.hero {
		width: 100%;
		height: 100vh;
		overflow: visible;
		position: absolute;
		display: block;
		top: 0;
		left: 0;
	}

	.hero > img {
		pointer-events: none;
		width: 100%;
		position: absolute;
		top: 0;
	}

	#narrow_bg {
		display: none;
	}

	.hero h1 {
		font-size: 8vw;
		color: black;
		font-family: 'ClearSansBold', 'Arial', sans-serif;
		font-weight: 900;
		z-index: 2;
		max-width: 45vw;
		margin-left: 40vw;
		line-height: 8vw;

		position: absolute;
		top: 12vw;
	}

	.hero h2 {
		position: absolute;
		z-index: 2;

		top: 35vw;
		margin-left: 50vw;
		color: black;

		font-weight: 900;
		font-size: 3.25vw;
		text-align: center;
	}

	.card.first {
		margin-top: 70vw;
	}

	.card {
		background: rgb(240, 240, 240);
		border-bottom: 5px black solid;

		width: 80%;
		max-width: 800px;
		padding: min(5vw, 30px);
		box-sizing: border-box;

		font-size: 20px;
		text-align: center;

		position: relative;
		z-index: 1;

		margin: 0 auto;
	}

	.card.wide {
		max-width: 1200px;
	}

	.textwrap {
		margin: 250px auto 100px auto;
	}

	.signupWrap {
		font-size: 30px;
		display: block;
		width: 100%;
		position: relative;
		text-align: center;
	}

	.signupWrap::after {
		content: '';
		height: 2.1vw;
		width: 100%;
		position: absolute;
		background: #00a0df;
		left: 0;
		top: calc(40px + 4vw);
	}

	.signupWrap p {
		position: relative;
	}

	.signupWrap p:first-child {
		margin-right: 20vw;
		margin-bottom: 0;
		padding-bottom: 4vw;
	}

	.signupWrap p:last-child {
		margin-left: 20vw;
		margin-top: 2vw;
		padding-top: 4vw;
	}

	.signupWrap p::after {
		content: '';
		width: 2.1vw;
		height: 3vw;
		position: absolute;
		background: #00a0df;

		left: 50%;
		transform: translateX(-50%);
	}

	.signupWrap p:first-child::after {
		bottom: 0;
	}

	.signupWrap p:last-child::after {
		top: 0;
		z-index: 2;
		transition: opacity 0.2s ease-in-out;
	}

	details {
		color: black;

		max-width: 1000px;
		width: 80%;
		display: block;
		margin: 10px auto;
		padding: 4vw 6vw;
		box-sizing: border-box;
		font-size: 18px;

		z-index: 3;
		position: relative;
	}

	details::before {
		content: '';

		width: 2.1vw;
		height: calc(100% + 3vw);
		position: absolute;
		left: 0;
		background: #8a2631;
	}

	details summary::before {
		content: '';
		position: absolute;
		left: calc(-6vw - 2.8vw + 1.05vw);
		top: 50%;
		transform: translateY(-50%);
		width: 4vw;
		height: 4vw;
		border-radius: 4vw;
		border: 0.8vw black solid;
		background: white;
		z-index: 4;
	}

	details summary {
		cursor: pointer;
		position: relative;
	}

	details summary::marker {
		font-size: 24px;
	}

	details h2 {
		display: inline;
		margin: 0;
	}

	.beginLine + details {
		padding-top: 0;
		margin-top: 0;
	}

	.beginLine + details::before {
		height: calc(100% + 60px + 2vw);
	}

	details.last {
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.beginLine {
		height: 5vw;
		width: max(calc(50% - 500px), 10%);

		border-top-style: solid;
		border-right-style: solid;
		border-top-width: 2.1vw;
		border-right-width: 2.1vw;
		border-color: #8a2631;
		border-top-right-radius: 5vw;

		margin-top: 100px;
		position: relative;
	}

	.endLine {
		height: 5vw;
		width: max(calc(50% - 500px), 10%);

		border-bottom-style: solid;
		border-right-style: solid;
		border-bottom-width: 2.1vw;
		border-right-width: 2.1vw;
		border-color: #8a2631;
		border-bottom-right-radius: 5vw;

		margin-top: calc(50px + 2vw);
		position: relative;
	}

	.disclaimer {
		max-width: 1000px;
		display: block;
		margin: 120px auto;
		color: black;
		position: relative;
		z-index: 2;
		padding: 50px 70px;
		box-sizing: border-box;
		font-size: 1.2em;
		text-align: left;
		border: none;

		box-shadow: 0 0 20px 15px red;
	}

	.disclaimer h3 {
		background: black;
		color: white;
		padding: 50px 70px;
		width: calc(100% + 140px);
		position: relative;
		left: -70px;
		top: -50px;
		margin: 0;
		box-sizing: border-box;
		font-size: 3em;
	}

	.ack {
		text-align: left;
		margin-bottom: 70px;
		padding-left: 70px;
		padding-right: 70px;
	}

	details a {
		color: black;
	}

	@media (max-width: 800px) {
		#narrow_bg {
			display: unset;
		}

		#wide_bg {
			display: none;
		}

		.hero h1 {
			font-size: 12vw;
			max-width: 100vw;
			margin-left: 20vw;
			top: 19vw;
			line-height: 11vw;
		}

		.hero h2 {
			top: 55vw;
			margin-left: 45vw;
		}

		.card.first {
			margin-top: 95vw;
		}
	}

	@media (max-width: 500px) {
		.card {
			padding-top: 0.1em;
			padding-bottom: 0;
		}

		.disclaimer,
		.ack {
			padding-left: 5vw;
			padding-right: 5vw;
		}

		.disclaimer {
			padding-top: 0;
			padding-bottom: 0.1em;
		}

		.disclaimer h3 {
			width: calc(100% + 10vw);
			left: -5vw;
			text-align: center;
			font-size: 10vw;
			top: 0;
		}

		.ack {
			padding-bottom: 0;
		}

		details {
			width: 90%;
			padding: 2em;
		}

		details summary::before {
			left: calc(-36px - 2.8vw + 1.05vw);
		}

		.beginLine,
		.endLine {
			width: 5%;
		}

		.endLine {
			margin-top: calc(35px + 2vw);
		}

		.signupWrap::after {
			top: 0;
		}

		.signupWrap::before {
			content: '';
			position: absolute;

			width: 4vw;
			height: 4vw;
			border-radius: 4vw;
			border: 0.8vw black solid;
			z-index: 4;
			background: white;
			top: calc(-2.8vw + 1.05vw);
			left: 50%;
			transform: translateX(-50%);
		}

		.signupWrap p:first-child {
			margin: 0;
			padding-top: 7vw;
			z-index: 2;
		}

		.signupWrap p:last-child {
			margin: -5vw 0 0 0;
			padding-top: 0;
			z-index: 1;
		}

		.signupWrap p::after {
			display: none;
		}
	}
</style>
