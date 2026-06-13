export function copyGreeting(teamSecretGuid: string, teamNum: number) {
	const text =
		`Hi y'all! Welcome to the Crosslake Crossover, team ${teamNum}! I'm Michael, and I'll be running Game Control today. Please ping me in this chat when you complete challenges so I can check off your progress. If a challenge has multiple parts, please ping me as you complete each part (don't wait until the end). You can also ask me questions and I'll try my best to answer or direct you to someone who can.

Your team's dashboard is available at this link: http://transittrek.org/tt6/game?id=${teamSecretGuid}
Note that this URL is specific to your team and should be kept secret, so please don't share it with anyone outside your team. If your URL is accidentally leaked, please let me know immediately as I can invalidate and generate a new link for you.

On your dashboard, once the game starts, you will be able to see all the challenges available to you, your team's score, rank, and other important progress information.
As a bit of advice, a lot of challenges involve parts on both sides of the lake, so it may be worthwhile to check all the challenges before you commit to spending the time needed to cross the lake. Repeat crossings can really eat into your time.

Please know that I built this site back in 2023 before AI and it's thus composed of 100% artisanal, hand-crafted garbage code, so I apologize in advance if it breaks or goes down during the game. Fingers crossed it'll be okay though.

Finally, your first task is to come up with a team name, so if you have not yet already, please decide amongst yourselves what you want your name to be. Just let me know once you have it.

Best of luck, and have fun!`;

	navigator.clipboard.writeText(text).then(() => {
		// eslint-disable-next-line no-alert
		alert(`Copied for team ${teamNum}`);
	});
}
