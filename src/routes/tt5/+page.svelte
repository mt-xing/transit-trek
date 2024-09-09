<script lang="ts">
	import BigBtn from '../../components/bigBtn.svelte';
	import SmallBtn from '../../components/smallBtn.svelte';
	import TopLogo from '../../components/topLogo.svelte';
	import { HOME_PAGE } from '../../utils/paths';

	import main_bg from '$lib/images/tt5/main_bg.png';
	import img_text from '$lib/images/tt5/logo.png';
	import side_pic from '$lib/images/tt5/side_pic.png';

	const PARTIFUL_LINK = 'https://partiful.com/e/3gs7n8wIY3Q7e2WWYHII';
</script>

<svelte:head>
	<title>Transit Trek: The Emerald City Expedition</title>
	<meta name="description" content="Seattle Transit Trek's September 2024 event" />
</svelte:head>

<div id="outerWrap">
	<TopLogo />

	<section class="hero">
		<img src={main_bg} alt="" class="main" />
		<img src={img_text} alt="" class="text" />
		<h1>The Emerald City Expedition</h1>
		<h2 class="date">September 21, 2024</h2>
	</section>

	<div class="textwrap">
		<img src={side_pic} alt="" class="leftpic" />
		<p class="midtext paper right">
			This one's a scavenger hunt. No gimmicks. No tricks. Just a straight race to complete as many
			tasks across Seattle as you can.
		</p>
	</div>

	<p class="midtext signupWrap upper">
		<strong>Ready to Trek?</strong>
		<BigBtn
			isBlack={true}
			href={PARTIFUL_LINK}
			text="Sign Up"
			color={['rgb(255,0,0)', 'rgb(128,0,0)']}
		/>
	</p>

	<div class="midtext paper full" style="margin-top: 100px;">
		<p>
			Transit Treks are part scavenger hunt, part games of skill, strategy, and pure dumb luck
			played across the Puget Sound.
			<SmallBtn href={HOME_PAGE} text="Learn More" isBlack={true} />
		</p>
		<p style="margin-top: 2vw;">
			Read on for detailed game rules, instructions, and important notices.
		</p>
	</div>

	<details style="margin-top: 100px">
		<summary><h2>Requirements</h2></summary>
		<ul>
			<li>
				ORCA card with either a pass or at least $10 loaded on it<br />
				<small>Microsoft- and Amazon-issued ORCA cards suffice for this requirement</small>
			</li>
			<li>
				A smartphone<br />
				<small>One team member must have an iPhone with Find My Friends enabled</small>
			</li>
			<li>Joined the Signal group</li>
			<li>
				Either:
				<ul>
					<li>A bandana from a prior Seattle Transit Trek and a $2 participation fee, or</li>
					<li>
						A $2.50 participation fee. In return, you will be given a bandana to be used throughout
						the game (and to keep as a souvenir and for future Transit Treks!)
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
				Find My Friends.
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
		<p>Will be provided at a later date.</p>
		<!-- <p>
			The map linked below shows the official game boundaries:<br />
			<a
				href="https://www.google.com/maps/d/u/0/edit?mid=1S8LD3VtSfWChnx_HwOy2LDIONo3_NwU&usp=sharing"
				target="_blank"
				style="color: black;">Game Boundaries</a
			>
		</p>
		<p>The game will not require you to leave the marked zone.</p> -->
	</details>

	<details>
		<summary><h2>Starting Point</h2></summary>
		<p>
			Show up to McGraw Square <strong>by 1:00pm</strong>. Free parking is available in adjacent
			Amazon buildings. The closest garages are the Day One or Doppler parking garages. The nearest
			Link light rail station is Westlake Station, exit A. The rules will be explained and
			participants will have the opportunity to ask clarifying questions to the organizers before
			the game starts. You will also have the chance to meet your team and discuss basic strategy.
			The game will begin when everyone is present and the organizers announce the start. Take your
			time or hurry up. The choice is yours; <strong>don’t be late!</strong>
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
		<p>The ending point will be Asean Streat in Westlake.</p>
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

	<details>
		<summary><h2>Live Scoreboard</h2></summary>
		<p>You can keep track of the score on your team dashboard.</p>
	</details>

	<blockquote class="disclaimer">
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

	<div class="midtext paper big">
		<h2 style="text-align: center;">Acknowledgements</h2>
		<p>Thank you to all of the people who worked to make the Seattle Transit Trek possible!</p>
		<ul>
			<li>
				<strong>Michael Xing</strong>: Game coordinator, author of the Transit Trek web app, Transit
				Trek 5 editor, Transit Trek co-organizer
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
			Sincerely,<br /><strong>Jeffrey Wang</strong><br />Transit Trek 5 author, co-creator of the
			Transit Trek, Transit Trek co-organizer
		</p>
	</div>

	<small class="credits">
		<p>
			This page includes photography by
			<a href="https://www.pexels.com/photo/aerial-view-of-city-buildings-3964406/" target="_blank"
				>Josh Fields</a
			>
			and
			<a
				href="https://www.pexels.com/photo/photo-of-white-ferris-wheel-across-city-buildings-2322707/"
				target="_blank">Garrett Morrow</a
			>
			on Pexels, and photography by
			<a href="https://unsplash.com/photos/public-market-center-signage-xsqF178XAhk" target="_blank"
				>Sabine Ojeil</a
			>
			on Unsplash, as well as photography by
			<a href="https://www.loc.gov/item/2018698702/" target="_blank">Carol Highsmith</a>.
		</p>
	</small>
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	#outerWrap {
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		overflow-x: hidden;
		overflow-y: hidden;

		background-image: url($lib/images/tt5/bg_repeat.jpg);
		background-size: 100% auto;
		background-repeat: repeat-y;
	}

	.hero {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero img.main,
	.hero img.text {
		position: absolute;
		pointer-events: none;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.hero > img {
		object-fit: cover;
		object-position: center;

		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;

		transform-origin: top left;
	}

	.hero .text {
		object-fit: contain;
		object-position: center center;

		z-index: 5;
	}

	.hero h1 {
		font-size: 5vw;
		color: white;
		font-family: 'Segoe UI', 'Arial', sans-serif;
		font-weight: 900;
		opacity: 0;
	}

	.hero h2 {
		position: absolute;
		z-index: 2;

		bottom: min(10vw, 10vh);
		color: white;

		font-weight: 900;
		font-size: 50px;
		text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7);
		-webkit-text-stroke: 5px black;
		paint-order: stroke fill;
		text-align: center;
	}

	.midtext {
		text-align: center;
		color: black;
		text-shadow: 0 0 10px white;
		paint-order: stroke fill;
		font-size: 20px;
		position: relative;
		z-index: 2;
		max-width: 1000px;
		margin: 0 auto;
	}

	.textwrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		margin-top: 150px;
	}

	.textwrap .leftpic {
		max-width: 30vw;
		margin-right: 10vw;
	}

	.midtext.paper {
		background-image: url($lib/images/tt5/og_paper.png);
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;

		width: 30vw;
		height: 20vw;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		padding: 10vw 5vw;
		box-sizing: border-box;
		position: relative;

		margin: 0;
	}

	.midtext.paper.full {
		width: 60vw;
		height: 40vw;
		margin: 0 auto;

		padding: 0 10vw;
	}

	.midtext.paper.big {
		width: 80vw;
		height: 53vw;
		margin: 0 auto;
		max-width: none;
		padding: 7vw 15vw;
	}

	.midtext.paper.big ul {
		max-width: 1000px;
		text-align: left;
	}

	.signupWrap {
		font-size: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: rgb(255, 255, 128);
		color: black;
		box-shadow: -2px 2px 10px black;

		width: 400px;
		padding: 80px 0;
	}

	.signupWrap.upper {
		margin: 200px auto 50px auto;
	}

	.signupWrap strong {
		margin-bottom: 30px;
	}

	details {
		color: black;

		background: rgb(255, 255, 128);
		max-width: 1000px;
		display: block;
		margin: 70px auto;
		padding: 2.5em 4em;
		box-sizing: border-box;

		z-index: 3;
		position: relative;

		backdrop-filter: blur(10px);
		box-shadow: -2px 2px 10px black;
	}

	details:nth-child(odd) {
		transform: translateX(5px) rotate(-0.1deg);
	}

	details:nth-child(even) {
		transform: translateX(-5px) rotate(0.1deg);
	}

	details:nth-child(8) {
		transform: translateX(-9px) rotate(0);
	}

	details::before,
	.disclaimer::before,
	.signupWrap::before,
	.midtext.paper::before {
		content: '';
		position: absolute;
		width: 50px;
		height: 50px;
		top: 5px;
		left: 45%;
		z-index: 1;
		background-image: url($lib/images/tt5/pin.png);
		background-size: contain;
		background-repeat: no-repeat;
		pointer-events: none;
	}

	.midtext.paper::before {
		top: 2vw;
	}

	.midtext.paper.full::before,
	.midtext.paper.big::before {
		top: 6vw;
		width: 60px;
		height: 60px;
	}

	details summary {
		cursor: pointer;
	}

	details summary::marker {
		font-size: 24px;
	}

	details h2 {
		display: inline;
		margin: 0;
	}

	.disclaimer {
		max-width: 1000px;
		display: block;
		margin: 120px auto;
		border: 5px red solid;
		background: rgb(255, 255, 128);
		color: black;
		position: relative;
		z-index: 2;
		padding: 50px 70px;
		box-sizing: border-box;
		font-size: 1.2em;

		box-shadow:
			0 0 15px 20px red inset,
			-5px 5px 15px black;
	}

	.disclaimer::before {
		width: 4vw;
		height: 4vw;
		top: 30px;
		left: 44%;
	}

	.disclaimer h3 {
		margin-top: 10px;
		font-size: 2em;
	}

	.credits,
	.credits a {
		color: black;
	}

	.credits {
		display: block;
		position: relative;
		z-index: 2;
		margin: 0 20px;
		padding: 10px 20px;
	}

	@media (max-width: 1500px) {
		.midtext.paper.big {
			width: 85vw;
			height: 65vw;
			margin: 0 auto;
			max-width: none;
			padding: 7vw 15vw;
		}

		.midtext.paper.big ul {
			max-width: initial;
		}
	}

	@media (max-width: 1300px) {
		.textwrap {
			margin-top: 50px;
		}

		.textwrap .leftpic {
			max-width: 40vw;
			margin-right: 5vw;
		}

		.textwrap .midtext.paper {
			width: 40vw;
			height: 30vw;
		}

		.midtext.paper.big {
			background-image: none;
			background: #e2caa3;
			box-shadow:
				inset 0 0 40px 20px #ab6838,
				-5px 5px 15px black;
			height: unset;
			padding: 2em 3em !important;

			width: 80%;
		}

		.midtext.paper.big::before {
			top: 10px;
			width: 50px;
			height: 50px;
		}
	}

	@media (max-width: 1100px) {
		details,
		.midtext,
		.disclaimer {
			margin-left: 5vw;
			margin-right: 5vw;
		}

		.disclaimer::before {
			width: 60px;
			height: 60px;
		}

		.midtext.paper.big {
			background-image: none;
			background: #e2caa3;
			box-shadow:
				inset 0 0 40px 20px #ab6838,
				-5px 5px 15px black;
			height: unset;
			padding: 2em 3em !important;

			width: 90%;
			box-sizing: border-box;
		}

		.midtext.paper.big::before {
			top: 10px;
			width: 50px;
			height: 50px;
		}
	}

	@media (max-width: 900px) {
		.hero img.main {
			object-fit: cover;
		}

		.hero img.text {
			transform: scale(1.4);
			transform-origin: center;
		}

		.textwrap {
			flex-direction: column-reverse;
			margin-top: 50px;
		}

		.textwrap .leftpic {
			max-width: 60vw;
			margin-right: 0;
			margin-top: 100px;
		}

		.textwrap .midtext.paper {
			width: 60vw;
			height: 45vw;
			padding-left: 3em;
			padding-right: 3em;
		}

		.textwrap .midtext.paper::before {
			top: 50px;
			width: 50px;
			height: 50px;
		}

		.midtext.paper.full {
			width: 85%;
			height: 63vw;
		}

		.midtext.paper.full::before {
			top: 10vw;
		}
	}

	@media (max-width: 700px) {
		.textwrap .midtext.paper {
			width: 100%;
			height: 80vw;
			max-width: none;
			max-height: none;

			padding: 0 4.5em;
		}

		.textwrap .midtext.paper::before {
			top: 12vw;
		}

		.midtext.paper.big {
			padding: 2em 2em !important;
		}
	}

	@media (max-width: 600px) {
		.textwrap .leftpic {
			max-width: 80%;
		}

		.signupWrap {
			flex-direction: column;
			width: 75%;
			padding-top: 2em;
			padding-bottom: 2em;
		}

		.signupWrap strong {
			margin-right: 0;
			margin-bottom: 30px;
		}

		details {
			padding-left: 10vw;
			padding-right: 10vw;
		}

		.hero .date {
			font-size: 8vw;
		}

		.midtext.paper.full {
			width: 100%;
			height: 80vw;

			font-size: 1em;
		}

		.midtext.paper.full p {
			display: flex;
			flex-direction: column;
		}
	}
</style>
