<script lang="ts">
	import TopLogo from '../../components/topLogo.svelte';

	import bg1 from '$lib/images/tt6/bg1.mp4';
	import bg2 from '$lib/images/tt6/bg2.mp4';
	import bgImg from '$lib/images/tt6/bg.jpg';
	import img1 from '$lib/images/tt6/img1.png';
	import img2 from '$lib/images/tt6/img2.png';
	import Tt6Card from '../../components/tt6/tt6Card.svelte';
	import BigBtn from '../../components/bigBtn.svelte';
	import SmallBtn from '../../components/smallBtn.svelte';
	import { HOME_PAGE } from '../../utils/paths';

	const PARTIFUL_LINK = 'https://partiful.com/e/hyNg3l3efh0tWMENkwo3';

	let firstVideoDone = false;
	let video2El: HTMLVideoElement | undefined;
	function handleEnd() {
		if (!firstVideoDone) {
			firstVideoDone = true;
			video2El?.play();
		}
	}
	function handleVid2Loaded() {
		if (video2El && !firstVideoDone) {
			video2El.currentTime = 0;
			video2El.pause();
		} else if (!video2El) {
			requestAnimationFrame(handleVid2Loaded);
		}
	}
</script>

<svelte:head>
	<title>Transit Trek: Crosslake Crossover</title>
	<meta name="description" content="Seattle Transit Trek's June 2026 event" />
</svelte:head>

<div id="outerWrap">
	<TopLogo />

	<svg width="0" height="0" style="position: absolute;">
		<filter id="knockout-glow">
			<feComponentTransfer in="SourceAlpha" result="solid-alpha">
				<feFuncA type="linear" slope="100" />
			</feComponentTransfer>
			<feGaussianBlur in="solid-alpha" stdDeviation="8" result="glow-blur" />
			<feFlood flood-color="#ffffff" result="glow-color" />
			<feComposite in="glow-color" in2="glow-blur" operator="in" result="colored-glow" />
			<feComposite in="colored-glow" in2="solid-alpha" operator="out" result="glow-outside-only" />
			<feMerge>
				<feMergeNode in="glow-outside-only" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</svg>

	<video muted loop bind:this={video2El} on:loadedmetadata={handleVid2Loaded}>
		<source src={bg2} type="video/mp4" />
	</video>
	<video
		autoplay
		muted
		on:ended={handleEnd}
		poster={bgImg}
		style={firstVideoDone ? 'display: none' : ''}
	>
		<source src={bg1} type="video/mp4" />
	</video>

	<section class="hero">
		<h1>
			<span class="cWrap cw1"
				><span class="card c1"><span class="c11">Cross</span><span class="c12">lake</span></span
				></span
			>
			<span class="cWrap cw2"
				><span class="card c2"><span class="c21">Cross</span><span class="c22">over</span></span
				></span
			>
		</h1>
		<h2 class="date">June 13, 2026</h2>
	</section>
</div>

<div class="cardWrap left">
	<div class="imgWrap">
		<Tt6Card>
			<img src={img1} alt="" />
		</Tt6Card>
	</div>
	<div class="textWrap">
		<Tt6Card>
			Throughout the ages, the disconnected lands of Seattle and the Eastside have been long
			separated, divided by impossible travel conditions and arduous journeys. Untold eons were
			spent by the unsuspecting travellers making the trip, and countless Transit Treks were played
			with only one side of the board.
		</Tt6Card>
	</div>
</div>

<div class="cardWrap right">
	<div class="imgWrap">
		<Tt6Card>
			<img src={img2} alt="" />
		</Tt6Card>
	</div>
	<div class="textWrap">
		<Tt6Card>
			But then, one day, a new technology shook the universe as we knew it. For the first time, a
			futuristic transport, consistent in speed, frequent in time, and grade separated from traffic,
			linked the two disparate worlds. Finally, people could travel easily in these smooth new
			vehicles that the engineers called "trains."
		</Tt6Card>
	</div>
</div>

<div class="standardCardWrap" style="margin-bottom: 15vh;">
	<Tt6Card>
		Your mission, should you choose to accept it, is to travel these new lands and complete
		challenges as you go to bridge these new frontiers. For the very first time, the Crosslake
		Crossover is a Transit Trek that spans both Seattle and the Eastside! Aided by the newly opened
		Link connections, ride transit and complete challenges across both sides of Lake Washington as
		you compete with other teams to see who can earn the most points, no longer burdeoned by the
		limits of geography.
	</Tt6Card>
</div>

<div style="text-align: center; margin-top: 10vh; margin-bottom: 20vh;">
	<Tt6Card>
		<h2>Ready to Trek?</h2>
		<BigBtn
			href={PARTIFUL_LINK}
			text="Sign Up"
			color={['rgb(0, 160, 223)', 'rgba(255, 255, 255, 0.1)']}
			customStyles="box-shadow: none; clip-path: polygon(1em 0%, 100% 0%, 100% calc(100% - 1em), calc(100% - 1em) 100%, 0% 100%, 0% 1em)"
		/>
	</Tt6Card>
</div>

<div class="standardCardWrap">
	<Tt6Card>
		<p>
			Transit Treks are part scavenger hunt, part games of skill, strategy, and pure dumb luck
			played across the Puget Sound.
			<SmallBtn href={HOME_PAGE} text="Learn More" />
		</p>
		<p style="margin-top: 1em;">
			Read on for detailed game rules, instructions, and important notices.
		</p>
	</Tt6Card>
</div>

<!-- RULES START -->
<div class="rulesCardWrap">
	<Tt6Card fillWidth={true}>
		<details>
			<summary><h2>Requirements</h2></summary>
			<ul>
				<li>
					ORCA card with either a pass or at least $20 loaded on it<br />
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
							A $5.50 participation fee. In return, you will be given a bandana to be used
							throughout the game (and to keep as a souvenir and for future Transit Treks!)
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
	</Tt6Card>
</div>

<div class="rulesCardWrap">
	<Tt6Card fillWidth={true}>
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
	</Tt6Card>
</div>

<div class="rulesCardWrap">
	<Tt6Card fillWidth={true}>
		<details>
			<summary>
				<h2>Rules</h2>
			</summary>

			<h3>Basic Gameplay Logistics</h3>
			<ul>
				<li>
					The objective of the game is to earn as many points as possible in the allotted time.
				</li>
				<li>
					Every player (that’s you!; also known as a Transit Trekker) must have a fully charged
					mobile phone with Signal installed.
					<ul>
						<li>Signal will be used to communicate between participants and the organizers.</li>
					</ul>
				</li>
				<li>At least one player in the team must have an iPhone with Find My Friends.</li>
				<li>Every player must be wearing a bandana provided by the organizers.</li>
				<li>
					For tracking purposes, one team member needs to share their location with the organizers
					on Find My (formerly known as Find My Friends).
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
					keep track of your team’s situation. Health and safety always come first, but it’s
					important for the organizers to keep track of exceptional circumstances affecting
					gameplay.
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
							<strong>Find This.</strong> Within the game area, try to find where a given picture was
							taken.
						</li>
					</ul>
				</li>
				<li>Team members must stay together (within 10 feet of each other) at all times.</li>
				<li>
					To officially complete a task, they must be reported to the organizers via Signal as soon
					as they are completed (for verification and tabulation purposes).
					<ul>
						<li>
							If a task requires you to complete multiple stages/steps, you may report each
							stage/step to the organizers separately.
						</li>
						<li>
							However, if you complete a task in its entirety, you must report it immediately. If
							you don’t report it within 5 minutes of completing it, you won’t be eligible for
							earning points on that task.
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
					If a task requires pictures as proof (which almost all of them do), all team members must
					be in the picture (as a selfie) unless explicitly not required. When in doubt, ask the
					organizers.
				</li>
				<li>
					If a task says you can’t look something up, it means you also can’t ask a
					non-participating person to look it up for you or tell you the answer.
				</li>
				<li>
					If you are not sure about what counts for a task, ask the organizers. Failure to ask may
					result in you not earning the points if your actions don’t qualify as properly completing
					the task.
				</li>
				<li>
					If a task requires each team member to procure something, then teams which have more
					members than other teams only need to get the number of items equivalent to the smallest
					team’s size. For instance, if the smallest team size is 4, then teams of 5 will only need
					to get 4 items.
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
					Teams may not have any intentional contact with each other during the game, unless they
					see each other in person, or as otherwise specified in the rules.
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
					You must obey all applicable laws, regulations, and rules during the game. (To be fair,
					it's probably also smart to obey laws outside the game.). <strong
						>This includes jaywalking.</strong
					>
				</li>
				<li>
					You must correctly pay the fare when taking transit. Note you no longer need to tap off of
					the Link.
				</li>
				<li>
					You may not obstruct any transit from operating along its normal schedule (by, for
					example, holding the doors open as they're closing).
				</li>
				<li>
					You may be filmed during the game for future promotional purposes unless you explicitly
					ask us not to film you.
				</li>
				<li>
					Rules can be changed by the organizers at any time before, during, and after the
					competition period. Whatever the organizers say can override any of the written rules.
					Rule changes will be clearly broadcasted on the Signal group.
				</li>
			</ul>
		</details>
	</Tt6Card>
</div>

<div class="rulesCardWrap">
	<Tt6Card fillWidth={true}>
		<details>
			<summary><h2>Game Zone + Boundaries</h2></summary>
			<!-- <p>
				The map linked below shows the official game boundaries:<br />
				<a
					href="https://www.google.com/maps/d/edit?mid=1ZjdJiiigXPSlK5A53keaGrNxIp6iocM&usp=sharing"
					target="_blank">Game Boundaries</a
				>
			</p>
			<p>
				The game will not require you to leave the marked zone. You may not complete challenges
				outside of the game area.
			</p> -->
			<p>Official game boundaries will be released closer to the start of the game.</p>
		</details>
	</Tt6Card>
</div>

<div class="rulesCardWrap">
	<Tt6Card fillWidth={true}>
		<details>
			<summary><h2>Starting Point</h2></summary>
			<p>
				Show up to Mercer Island Station <strong>by 1:00pm</strong>. Free parking is available at
				the station's parking lot. Alternatively, you can park for free at the South Bellevue Park &
				Ride (or any park and ride, really) and take the Link to Mercer Island. The rules will be
				explained and participants will have the opportunity to ask clarifying questions to the
				organizers before the game starts. You will also have the chance to meet your team and
				discuss basic strategy. The game will begin when everyone is present and the organizers
				announce the start. Take your time or hurry up. The choice is yours;
				<strong>don’t be late!</strong>
			</p>
			<p>
				One member of your team should be designated as the primary representative, who will be
				responsible for communicating with the organizers. In addition, one member of the team (who
				may also be the primary representative) must share their location with the chasers.
			</p>
		</details>
	</Tt6Card>
</div>

<div class="rulesCardWrap">
	<Tt6Card fillWidth={true}>
		<details>
			<summary><h2>Ending Point</h2></summary>
			<p>The ending point will be Asean Streats in downtown Seattle.</p>
		</details>
	</Tt6Card>
</div>

<div class="rulesCardWrap">
	<Tt6Card fillWidth={true}>
		<details>
			<summary><h2>Starting Procedures</h2></summary>
			<ol>
				<li>Sign in with the organizers</li>
				<li>Listen to the logistics overview</li>
				<li>Pick a name for your team</li>
				<li>
					Pick a representative for the team, who will share their location with the organizers
				</li>
				<li>Get your bandana! (and pay for it if you haven’t already)</li>
				<li>Read the rules and ask questions to the organizers for clarification</li>
				<li>Take a group picture!</li>
				<li>Decide as a team what the strategy is and how to start</li>
			</ol>
		</details>
	</Tt6Card>
</div>

<div class="rulesCardWrap">
	<Tt6Card fillWidth={true}>
		<details class="last">
			<summary><h2>Live Scoreboard</h2></summary>
			<p>You can keep track of the score on your team dashboard.</p>
		</details>
	</Tt6Card>
</div>
<!-- RULES END -->

<div class="standardCardWrap">
	<Tt6Card isRed={true}>
		<div class="disclaimer">
			<h2>Safety Disclaimer</h2>
			<p>
				You (a Participant) and your safety are of paramount importance during your participation in
				the Seattle Transit Trek (the “Game”). You are strongly advised to avoid areas that may
				present imminent danger to you or your fellow Participants. In case a diversion needs to be
				made, you should report it to the Organizers and appropriate compensation in terms of points
				and/or time will be made for you, including but not limited to, bonus points, the waiver of
				a late return penalty, etc.
			</p>
			<p>
				You may also not engage in any illegal activity to gain an unfair advantage in the Game.
				Doing so will result in penalties including/up to disqualification.
			</p>
			<p>
				By participating in the Game, you agree that you are playing the Game at your own risk. You
				furthermore agree to hold the Organizers harmless and hold your fellow Participants
				harmless, even by the negligence of the Organizers or fellow Participants.
			</p>
			<p>
				<strong>
					IN NO EVENT WILL THE ORGANIZERS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT,
					INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES ARISING FROM
					YOUR PARTICIPATION IN THIS GAME, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
					DAMAGES. BY PARTICIPATING IN THIS GAME, YOU HEREBY WAIVE, RELEASE, AND DISCHARGE THE
					ORGANIZERS AND THEIR AGENTS OF ANY AND ALL LIABILITY OR DAMAGES OF ANY KIND RELATED TO,
					ARISING FROM, OR IN ANY WAY CONNECTED WITH, YOUR PARTICIPATION IN THIS GAME, INCLUDING
					THOSE ALLEGEDLY ATTRIBUTED TO THE NEGLIGENT ACTS OR OMISSIONS OF THE AFOREMENTIONED
					PARTIES.
				</strong>
			</p>
		</div>
	</Tt6Card>
</div>

<div class="standardCardWrap" style="margin-bottom: 5vh;">
	<Tt6Card>
		<h2 style="text-align: center;">Acknowledgements</h2>
		<p>Thank you to all of the people who worked to make the Seattle Transit Trek possible!</p>
		<ul style="text-align: left;">
			<li>
				<strong>Michael Xing</strong>: Game coordinator, author of the Transit Trek web app, Transit
				Trek 6 editor, Transit Trek co-organizer
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
			Sincerely,<br /><strong>Jeffrey Wang</strong><br />Transit Trek 6 author, co-creator of the
			Transit Trek, Transit Trek co-organizer
		</p>
	</Tt6Card>
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;

		overflow-x: hidden;
		background: black;
	}

	#outerWrap {
		position: relative;
		width: 100%;
		padding: 0;
		margin: 0;
		overflow-x: hidden;
		overflow-y: hidden;
	}

	.hero {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	video {
		object-fit: cover;
		object-position: center;
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.hero h1 {
		color: white;
		text-align: center;
		font-size: min(15vh, 10vw);
		font-weight: 900;
	}

	.hero .card {
		position: relative;
		display: inline-block;
		background: none;
		text-align: center;
		padding: 0em 0.2em;
		border-radius: 1vh;
		margin: 1vh;
		overflow: hidden;

		--radius: 2vh;
		--a: calc(var(--radius) / tan(67.5deg));
		--b: calc(var(--radius) / tan(67.5deg) / sqrt(2));
	}

	.hero .card::before {
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

	.hero .card span {
		mix-blend-mode: add;
		vertical-align: top;
		display: inline-block;
	}

	.hero .card .c12 {
		margin-top: 0.3em;
	}

	.hero .card .c21 {
		margin-top: 0.3em;
	}

	.hero .card .c11,
	.hero .card .c22 {
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgb(0, 160, 223));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
		-webkit-text-stroke: 1px rgba(105, 255, 255, 0.6);
	}

	.hero .card .c12,
	.hero .card .c21 {
		background: linear-gradient(to bottom, rgba(230, 248, 227, 0.1), rgba(61, 174, 43, 0.8));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
		-webkit-text-stroke: 1px rgba(79, 228, 192, 0.6);
	}

	.hero .cw1 {
		margin-top: 0.3em;
		--xAmt: -25%;
	}

	.hero .c1 {
		clip-path: shape(
			from var(--radius) 0,
			line to calc(100% - var(--radius)) 0,
			arc to 100% var(--radius) of var(--radius) cw,
			line to 100% calc(100% - var(--radius)),
			arc to calc(100% - var(--radius)) 100% of var(--radius) cw,
			line to calc(53.5% + var(--a)) 100%,
			arc to calc(53.5% - var(--b)) calc(100% - var(--b)) of var(--radius) cw,
			line to calc(46.5% + var(--b)) calc(75% + var(--b)),
			arc to calc(46.5% - var(--a)) 75% of var(--radius) ccw,
			line to calc(5% + var(--a)) 75%,
			arc to calc(5% - var(--b)) calc(75% - var(--b)) of var(--radius) cw,
			line to var(--b) calc(75% - 25% * 5 / 7 + var(--b)),
			arc to 0 calc(75% - 25% * 5 / 7 - var(--a)) of var(--radius) cw,
			line to 0 var(--radius),
			arc to var(--radius) 0 of var(--radius) cw,
			close
		);
	}

	.hero .c1 span {
		transform: translateY(-0.1em);
	}

	.hero .cw2 {
		margin-top: -0.4em;
		--xAmt: 25%;
		--delay: 2s;
		--speed: 1.5s;
	}

	.hero .c2 {
		clip-path: shape(
			from var(--radius) 100%,
			line to calc(100% - var(--radius)) 100%,
			arc to 100% calc(100% - var(--radius)) of var(--radius) ccw,
			line to 100% var(--radius),
			arc to calc(100% - var(--radius)) 0 of var(--radius) ccw,
			line to calc(53.5% + var(--a)) 0,
			arc to calc(53.5% - var(--b)) calc(var(--b)) of var(--radius) ccw,
			line to calc(46.5% + var(--b)) calc(25% - var(--b)),
			arc to calc(46.5% - var(--a)) 25% of var(--radius) cw,
			line to calc(5% + var(--a)) 25%,
			arc to calc(5% - var(--b)) calc(25% + var(--b)) of var(--radius) ccw,
			line to var(--b) calc(25% + 25% * 5 / 7 - var(--b)),
			arc to 0 calc(25% + 25% * 5 / 7 + var(--a)) of var(--radius) ccw,
			line to 0 calc(100% - var(--radius)),
			arc to var(--radius) 100% of var(--radius) ccw,
			close
		);
	}

	.cWrap {
		filter: url(#knockout-glow);
		display: block;

		--xAmt: 0;
		--delay: 1.8s;
		--speed: 1s;
		--zoom: 1;
		transform: translateX(var(--xAmt)) scale(var(--zoom));
		opacity: 1;
		transition:
			--zoom var(--speed) cubic-bezier(0.23, 1, 0.32, 1) var(--delay),
			opacity var(--speed) cubic-bezier(0.23, 1, 0.32, 1) var(--delay);

		@starting-style {
			--zoom: 1.2;
			opacity: 0;
		}
	}

	@property --zoom {
		syntax: '<number>';
		inherits: true;
		initial-value: 1;
	}

	.hero .date {
		position: absolute;
		bottom: min(1vw, 1vh);
		color: rgba(128, 255, 255);
		font-size: min(50px, 8vw);
		font-weight: 900;

		text-shadow: 0 0 5px black;
		transition: opacity 1s ease-out 3s;
		opacity: 0.6;

		@starting-style {
			opacity: 0;
		}
	}

	@media (max-width: 800px) {
		.hero h1 {
			font-size: min(15vh, 15vw);
		}

		.hero .cw1 {
			--xAmt: -7%;
		}

		.hero .cw2 {
			--xAmt: 7%;
			margin-top: -0.2em;
		}
	}

	h2 {
		text-shadow: 0 0 15px black;
		-webkit-text-stroke: 2px black;
		paint-order: stroke fill;
	}

	.disclaimer {
		font-size: 1.2em;
	}

	.cardWrap {
		width: 90%;
		margin: 20vh auto;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cardWrap.left {
		flex-direction: row;
	}

	.cardWrap.right {
		flex-direction: row-reverse;
	}

	.cardWrap .imgWrap {
		width: 25%;
	}

	.cardWrap img {
		max-width: 20vw;
	}

	.cardWrap .textWrap {
		width: 65%;
		margin: 0 5vw;
		max-width: 800px;
	}

	.standardCardWrap {
		width: 60%;
		margin-left: 20vw;
		margin-top: 10vh;
	}

	.rulesCardWrap {
		width: 60%;
		margin-left: 20vw;
		margin-top: 5vh;
	}

	details {
		text-align: left;
	}

	details a {
		color: white;
	}

	details h2 {
		display: inline-block;
		padding-left: 0.25em;
	}

	@media (max-width: 1200px) {
		.standardCardWrap,
		.rulesCardWrap {
			width: 80%;
			margin-left: 10vw;
		}
	}

	@media (max-width: 900px) {
		.cardWrap {
			width: 90%;
			margin: 10vh auto 0 auto;
		}

		.cardWrap.left,
		.cardWrap.right {
			flex-direction: column-reverse;
		}

		.cardWrap .imgWrap {
			width: min(100%, 360px);
		}

		.cardWrap img {
			max-width: min(100%, 300px);
		}

		.cardWrap .textWrap {
			width: 100%;
			margin: 5vh 0;
			max-width: unset;
		}
	}

	@media (max-width: 700px) {
		.standardCardWrap,
		.rulesCardWrap {
			width: 90%;
			margin-left: 5vw;
		}
	}
</style>
