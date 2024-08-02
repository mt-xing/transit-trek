<script lang="ts">
	import { onMount } from 'svelte';
	import BigBtn from '../../components/bigBtn.svelte';
	import SmallBtn from '../../components/smallBtn.svelte';
	import TopLogo from '../../components/topLogo.svelte';
	import bg_clean from '$lib/images/tt4/bg_clean.png';
	import shards_clean from '$lib/images/tt4/shards_clean.png';
	import text_clean from '$lib/images/tt4/text_clean_2.png';
	import eye_vid_webm from '$lib/images/tt4/eye.webm';
	import eye_vid_hevc from '$lib/images/tt4/eye-hevc.mov';
	import shard1 from '$lib/images/tt4/shard_1.png';
	import shard2 from '$lib/images/tt4/shard_2.png';
	import shard3 from '$lib/images/tt4/shard_3.png';

	import bg1 from '$lib/images/tt4/bg_shards/bg_1.png';
	import bg2 from '$lib/images/tt4/bg_shards/bg_2.png';
	import bg3 from '$lib/images/tt4/bg_shards/bg_3.png';
	import bg4 from '$lib/images/tt4/bg_shards/bg_4.png';
	import { HOME_PAGE } from '../../utils/paths';

	const PARTIFUL_LINK = 'https://partiful.com/e/xewzRnBpyz9KKKOocilt';

	const shardImgs = [bg1, bg2, bg3, bg4];

	let mouseX = 0.5;
	let mouseY = 0.5;

	let scrollY: number;
	let innerHeight: number;

	let shardInfo: { x: number; y: number; rot: number; size: number; big: boolean }[] = [];

	let loaded = false;

	let parallaxY: number;
	$: parallaxY = loaded ? scrollY / (document.documentElement.scrollHeight - innerHeight) : 0;

	onMount(() => {
		loaded = true;
		const maxHeight =
			((document.body.scrollHeight - window.innerHeight * 2) / window.innerHeight) * 100;

		[
			{ x: 12, y: 25, rot: 20, size: 1, big: true },
			{ x: 72, y: 80, rot: -20, size: 1, big: true },
			{ x: 5, y: 145, rot: 60, size: 1, big: true },
			{ x: 75, y: 180, rot: -60, size: 1, big: true },
			{ x: 30, y: 25, rot: 20, size: 1, big: true },
			{ x: 72, y: 80, rot: -20, size: 1, big: true },
			{ x: 55, y: 145, rot: 60, size: 1, big: true },
			{ x: 2, y: 180, rot: -60, size: 1, big: true },
		].forEach((s, i, a) => {
			shardInfo.push({ ...s, y: (maxHeight * (i + 0.5)) / a.length });
		});

		for (let i = 0; i < 20; i++) {
			const x = Math.random() * 80;
			const y = Math.random() * maxHeight;
			const rot = Math.random() * 360;
			const size = Math.random() * 0.2 + 0.1;
			shardInfo.push({ x, y, rot, size, big: false });
		}
		shardInfo = shardInfo;
	});

	function handleMousemove(event: MouseEvent) {
		mouseX = event.clientX / window.innerWidth;
		mouseY = event.clientY / window.innerHeight;
	}

	const firstParallax = 0.01;

	$: parallaxMouseY = loaded ? mouseY - Math.min(scrollY / window.innerHeight, 1) * 20 : mouseY;

	$: firstParallaxLeft = loaded ? `${mouseX * window.innerWidth * -firstParallax}px` : '';
	$: firstParallaxTop = loaded ? `${parallaxMouseY * window.innerHeight * -firstParallax}px` : '';

	const secondParallax = 0.005;

	$: secondParallaxLeft = loaded ? `${mouseX * window.innerWidth * -secondParallax}px` : '';
	$: secondParallaxTop = loaded ? `${parallaxMouseY * window.innerHeight * -secondParallax}px` : '';

	$: bigShardParallaxY = (parallaxY - 0.5) * 0.15 * innerHeight;
</script>

<svelte:head>
	<title>Transit Trek: Hide and Seek</title>
	<meta name="description" content="Seattle Transit Trek's August 2024 event, Hide and Seek" />
</svelte:head>

<svelte:window bind:scrollY bind:innerHeight on:mousemove={handleMousemove} />

<div id="outerWrap">
	<TopLogo />

	<div class="bodyBg"></div>

	<section class="hero">
		<img
			src={bg_clean}
			alt=""
			class="bg"
			style="
            transform:scale({1 + firstParallax});
            left: {firstParallaxLeft};
            top: {firstParallaxTop};"
		/>
		<img
			src={shards_clean}
			alt=""
			class="shards"
			style="
            transform:scale({1 + secondParallax});
            left: {secondParallaxLeft};
            top: {secondParallaxTop};"
		/>
		<div class="gradient"></div>
		<img class="text" src={text_clean} alt="" />
		<video width="256" height="256" class="eyeWrap" autoplay muted playsinline loop>
			<source src={eye_vid_hevc} type={'video/mp4; codecs="hvc1"'} />
			<source src={eye_vid_webm} type="video/webm" />
		</video>
		<h1>Hide & Seek</h1>
		<h2 class="date">August 3, 2024</h2>
	</section>

	<div class="postHero"></div>

	{#each shardInfo as shard, i}
		<img
			src={shardImgs[i % shardImgs.length]}
			alt=""
			class="bgShard {shard.big ? 'big' : 'small'}"
			style="transform: translate({shard.x}vw, calc({shard.y}vh + {(parallaxY - 0.5) *
				(shard.big ? 0.9 : 1.5) *
				innerHeight}px)) rotate({shard.rot}deg) scale({shard.size});"
		/>
	{/each}

	<p class="midtext signupWrap upper">
		<strong>Ready to Trek?</strong>
		<BigBtn href={PARTIFUL_LINK} text="Sign Up" color={['rgb(255,100,255)', 'rgb(50,0,100)']} />
	</p>

	<section class="right">
		<img
			src={shard1}
			alt=""
			style="transform: translateY({bigShardParallaxY}px)rotate({(parallaxY - 0.5) * 0.1}rad);"
		/>
		<div>
			<h2>It's Senior Skip Day!</h2>
			<p>
				You and your friends are trying to have a fun-packed day in Seattle. Unfortunately, your
				school's Dean of Students is suspicious of you calling in sick, and if they catch you with
				your friends, your day will be ruined. Even worse, they'll be in Seattle tracking you down.
			</p>
		</div>
	</section>

	<section class="left long">
		<img
			src={shard3}
			alt=""
			style="transform: translateY({bigShardParallaxY}px)rotate({(parallaxY - 0.5) * -0.05}rad);"
		/>
		<div>
			<h2>See the City</h2>
			<p>
				Your goal is to do as many fun things on your agenda (“tasks”) as possible without being
				spotted by the Dean of Students. Take transit! Explore the city! Get to all of the touristy
				sights without the help of a car.
			</p>
		</div>
	</section>

	<section class="right">
		<img
			src={shard2}
			alt=""
			style="transform: translateY({bigShardParallaxY}px)rotate({(parallaxY - 0.5) * 0.15}rad);"
		/>
		<div>
			<h2>Don't Get Caught</h2>
			<p>
				In the past, the Dean of Students only would have dealt with you had you been caught. But
				this year, they find your 9 absences so suspicious that they will actively sabotage your
				day. They've forced your best friend to share their location, and worst of all, they’ll be
				actively monitoring it this time.
			</p>
		</div>
	</section>

	<p class="midtext signupWrap lower">
		<strong>Sound Fun?</strong>
		<BigBtn href={PARTIFUL_LINK} text="Sign Up" color={['rgb(255,100,255)', 'rgb(50,0,100)']} />
	</p>

	<p class="midtext">
		Transit Treks are part scavenger hunt, part games of skill, strategy, and pure dumb luck played
		across the Puget Sound.
		<SmallBtn href={HOME_PAGE} text="Learn More" />
	</p>

	<p class="midtext" style="margin-top: 200px;">
		Read on for detailed game rules, instructions, and important notices.
	</p>

	<details style="margin-top: 100px">
		<summary><h2>Requirements</h2></summary>
		<ul>
			<li>
				ORCA card with either a pass or at least $9.75 loaded on it<br />
				<small>Microsoft- and Amazon-issued ORCA cards suffice for this requirement</small>
			</li>
			<li>A smartphone</li>
			<li>One team member must have an iPhone with Find My Friends enabled</li>
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
		<p>
			Objective of the game: earn as many points as possible without being caught by a chaser (the
			Dean of Students)
		</p>
		<ul>
			<li>Each task is worth a certain number of points, specified below</li>
			<li>Most tasks are relatively close to public transit stations</li>
			<li>
				If your team is caught by a chaser, your team will be impaired for 10 minutes and you lose 5
				points
			</li>
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
			<li>The objective of the game is to earn as many points as possible without being caught.</li>
			<li>
				Every player (that’s you!; also known as a Transit Trekker) must have a fully charged mobile
				phone with Signal installed.
				<ul>
					<li>Signal will be used to communicate between participants and the organizers.</li>
				</ul>
			</li>
			<li>You can be caught by a chaser in any part of the game except safe zones.</li>
			<li>At least one player in the team must have an iPhone with Find My Friends.</li>
			<li>Every player must be wearing a bandana provided by the organizers.</li>
			<li>
				There will be more than one chaser, with the exact number to be announced on the day of.
			</li>
			<li>
				The chasers will share their location with one member from each team (whoever has an
				iPhone).
			</li>
			<li>You will be required to share your exact location.</li>
			<li>
				You will not know what the chaser’s plans are, but expect them to visit many of the same
				places you’ll be going to.
			</li>
			<li>
				You will be considered “caught” by a chaser if the chaser sees you and tells you to stop.
				<ul><li>You can’t run away from the chaser if they catch you visually.</li></ul>
			</li>
			<li>
				If caught by a chaser, you will be required to choose an impairment for 10 minutes and you
				lose 5 points.
			</li>
			<li>
				During the first 15 and the last 15 minutes of the game, there is a moratorium on chasing
				and the chasers won’t be going after you, nor will they be able to catch you. It is,
				however, in your team’s interest to get as far away from them as possible during the first
				15 minutes of the game.
			</li>
			<li>
				Players must travel by foot or public transit operated by the City of Seattle, the Seattle
				Monorail, King County Metro, or branded as Sound Transit.
				<ul>
					<li>
						Absolutely no traveling on cars, trucks, boats, planes, bikes, scooters, or Segways.
					</li>
				</ul>
			</li>
			<li>
				Chasers may travel by any mode of transportation, whether it is a public or private mode of
				transport.
			</li>
			<li>
				Players and chasers must stay within the bounds of the game.
				<ul>
					<li>
						Because it is not fair to exit the bounds of the game to hide from the chaser, teams
						will have 1 point deducted for each violation detected.
					</li>
				</ul>
			</li>
			<li>
				<strong
					>Players may not intentionally hide in publicly inaccessible areas to escape detection.</strong
				>
				For instance, if you live within the game area, you may not hide your team in your apartment/house.
				You also may not hide in a bathroom to evade capture unless you are taking a genuine bio break.
				You may not purchase access to a venue that requires paid ticketed admission or is otherwise
				de facto unreachable by a chaser.
				<ul>
					<li>
						Doing so without consent from the organizers will result in point penalties or
						disqualification from the game.
					</li>
				</ul>
			</li>
			<li>
				Each team is required to take a 10 minute food/bio break sometime between the beginning of
				the 2nd hour and end of the 3rd hour. You are encouraged to do so only when you are safely
				far away from the chasers, or if you are in a safe zone. Failure to do so will result in
				disqualification.
			</li>
			<li>
				In case a bio break takes longer than 10 minutes, please inform the organizers so they can
				keep track of your team’s situation. Health and safety always come first, but it’s important
				for the organizers to keep track of exceptional circumstances affecting gameplay.
			</li>
		</ul>

		Impairments:
		<ul>
			<li>
				One team member must hop around with one foot for 10 minutes, as if they had a cast on. They
				may alternate feet every 30 seconds. They may be (and probably should be) assisted by at
				least one, if not two, other team members.
			</li>
		</ul>

		<h3>Completing Challenge Tasks</h3>
		<ul>
			<li>The list of tasks are in the last portion of this document.</li>
			<li>
				There are three types of challenges that will earn you points:
				<ul>
					<li><strong>Take selfies.</strong> Visit a location and take a selfie there.</li>
					<li>
						<strong>Experiences.</strong> Go to a specified location and follow the instructions provided.
					</li>
					<li>
						<strong>Distractions and diversions.</strong> Much like the D&Ds in RuneScape, these are
						side quests and can be done at any point in the game.
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
					<li>The number of times a team was caught by chasers will next be used to tiebreak</li>
					<li>
						If the teams each were caught the same number of times, the number of times they were
						reported by other teams will be taken into account
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
				You must correctly pay the fare when taking transit. This includes both tapping on but
				<strong>also tapping off</strong> the Link.
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
				href="https://www.google.com/maps/d/u/0/edit?mid=1S8LD3VtSfWChnx_HwOy2LDIONo3_NwU&usp=sharing"
				target="_blank"
				style="color: white;">Game Boundaries</a
			>
		</p>
		<p>The game will not require you to leave the marked zone.</p>
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
			<li>
				Pick a representative for the team, who will be able to see the chasers’ locations (and
				whose location will be shared with the chasers)
			</li>
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

	<div class="midtext" style="text-align: left; margin: 150px auto; width: calc(100% - 100px)">
		<h2 style="text-align: center;">Acknowledgements</h2>
		<p>Thank you to all of the people who worked to make the Seattle Transit Trek possible!</p>
		<ul>
			<li>
				<strong>Michael Xing</strong>: Game coordinator, author of the Transit Trek web app, Transit
				Trek 4 editor, Transit Trek co-organizer
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
			Sincerely,<br /><strong>Jeffrey Wang</strong><br />Transit Trek 4 author, co-creator of the
			Transit Trek, Transit Trek co-organizer
		</p>
	</div>

	<small class="credits">
		<p>
			This page includes photography by
			<a href="https://www.pexels.com/photo/aerial-view-of-city-buildings-3964406/" target="_blank"
				>Josh Fields</a
			>,
			<a href="https://www.pexels.com/photo/space-needle-seattle-944636/" target="_blank"
				>Zoe Pappas</a
			>, and
			<a
				href="https://www.pexels.com/photo/photo-of-white-ferris-wheel-across-city-buildings-2322707/"
				target="_blank">Garrett Morrow</a
			>
			on Pexels, and photography by
			<a
				href="https://unsplash.com/photos/selective-focus-photography-of-glacier-mountain-under-blue-sky-jF6GX9rX3Bw"
				target="_blank">Lucas Davies</a
			>,<a href="https://unsplash.com/photos/man-in-brown-jacket-statue-7mH9jwVVwSg" target="_blank"
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
			>
			on Unsplash, as well as illustrations by
			<a
				href="https://www.freepik.com/free-vector/realistic-glass-shard-pieces_23996211.htm"
				target="_blank">pikisuperstar</a
			>
			and
			<a
				href="https://www.freepik.com/free-vector/broken-glass-fragments-shards-realistic-set_4300945.htm"
				target="_blank">macrovector</a
			> from Freepik.
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

	.hero > img,
	.hero > div {
		position: absolute;
		pointer-events: none;
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

	.hero .gradient {
		opacity: 0.4;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom right, #ffc800, #8300fe);
		mix-blend-mode: multiply;
	}

	.hero h1 {
		font-size: 12vw;
		color: white;
		font-family: 'Segoe UI', 'Arial', sans-serif;
		font-weight: 900;
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

	.hero .eyeWrap {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, calc(min(1vw, 1.8vh) - 50%));
		z-index: 2;
		opacity: 0.8;
		pointer-events: none;
		max-width: min(12vw, 21.6vh);
	}

	.bodyBg {
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: radial-gradient(farthest-corner at 0 0, #150f37, #0e0a1a);
	}

	.postHero {
		position: absolute;
		z-index: 1;
		top: 90vh;
		left: 0;
		right: 0;
		height: 20vh;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #0e0a1a, rgba(0, 0, 0, 0));
	}

	section.right,
	section.left {
		color: white;
		font-size: 1.2em;

		width: 80%;
		margin: 100px auto;
		max-width: 1200px;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	section.right > div,
	section.left > div {
		width: 60%;
		position: relative;
		z-index: 2;
	}

	section.right img,
	section.left img {
		max-width: 30%;
		opacity: 0.8;
	}

	section.right {
		flex-direction: row-reverse;
	}

	section.right div {
		margin-right: 10%;
	}

	section.left {
		flex-direction: row;
	}

	section.left div {
		margin-left: 10%;
	}

	section.long > div {
		width: 40%;
	}

	section.long img {
		max-width: 50%;
	}

	section.right h2,
	section.left h2 {
		text-shadow:
			0 0 20px purple,
			20px 0 20px purple,
			-20px 0 20px purple,
			0 10px 20px purple,
			0 -10px 20px purple;
	}

	.bgShard {
		position: absolute;
		width: max(20vw, 200px);
		top: 100vh;
		left: 0;
		z-index: 1;
		pointer-events: none;
	}

	.bgShard.big {
		opacity: 0.7;
		filter: blur(5px) brightness(0.7);
	}

	.bgShard.small {
		filter: blur(10px) brightness(0.7);
		opacity: 0.5;
	}

	.midtext {
		text-align: center;
		color: white;
		font-size: 20px;
		position: relative;
		z-index: 2;
		max-width: 1000px;
		margin: 0 auto;
	}

	.signupWrap {
		font-size: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.signupWrap.upper {
		margin: 200px auto 50px auto;
	}

	.signupWrap.lower {
		margin: 200px auto 250px auto;
	}

	.signupWrap strong {
		margin-right: 50px;
	}

	details {
		color: white;

		background: rgba(0, 0, 0, 0.3);
		max-width: 1000px;
		display: block;
		margin: 70px auto;
		padding: 2em 4em;
		box-sizing: border-box;

		z-index: 3;
		position: relative;

		backdrop-filter: blur(10px);
		border-top: 2px rgba(255, 150, 255, 0.5) solid;
		box-shadow: 2px 2px 10px black;
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
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(5px);
		color: white;
		position: relative;
		z-index: 2;
		padding: 30px 60px;
		box-sizing: border-box;
		font-size: 1.2em;

		box-shadow: 0 0 20px 10px rgba(255, 0, 0, 0.4);
	}

	.disclaimer h3 {
		margin-top: 10px;
		font-size: 2em;
	}

	.credits,
	.credits a {
		color: white;
	}

	.credits {
		display: block;
		position: relative;
		z-index: 2;
		margin: 0 20px;
		padding: 10px 20px;
	}

	@media (max-width: 1100px) {
		details,
		.midtext,
		.disclaimer {
			margin-left: 5vw;
			margin-right: 5vw;
		}
	}

	@media (max-width: 700px) {
		section.left,
		section.right {
			flex-direction: column-reverse;
		}

		section.left > div,
		section.right > div {
			width: 100%;
			margin: 0 0 50px 0;
		}

		section.left > img,
		section.right > img {
			max-width: 250px;
		}

		section.long > img {
			max-width: 70%;
		}
	}

	@media (max-width: 600px) {
		.signupWrap {
			flex-direction: column;
		}

		.signupWrap strong {
			margin-right: 0;
			margin-bottom: 30px;
		}

		details {
			padding-left: 10vw;
			padding-right: 10vw;
		}
	}
</style>
