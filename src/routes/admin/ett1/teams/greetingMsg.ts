export function copyGreeting(teamSecretGuid: string, teamNum: number) {
	const text = `Hi y'all! I'm Michael, and I'll be running Game Control today. Please ping me in this chat when you complete challenges so I can check off your progress. You can also ask me questions and I'll try my best to answer or direct you to someone who can.

Your team's dashboard is available at this link: http://transittrek.org/ett1/game?id=${teamSecretGuid}
Note that this URL is specific to your team and should be kept secret, so please don't share it with anyone outside your team. If your URL is accidentally leaked, please let me know immediately as I can invalidate and generate a new link for you.

On your dashboard, once the game starts, you will be able to see all the challenges available to you, your team's score, rank, and other important progress information.

Please know that this is effectively the same sketchy site from last year which I have not had time to refactor or improve in any meaningful way, so I apologize in advance if it breaks or goes down during the game. Fingers crossed it'll be okay though.

Finally, your first task is to come up with a team name, so if you have not yet already, please decide amongst yourselves what you want your name to be. Just let me know once you have it.

Best of luck, and have fun!`;

	navigator.clipboard.writeText(text).then(() => {
		// eslint-disable-next-line no-alert
		alert(`Copied for team ${teamNum}`);
	});
}
