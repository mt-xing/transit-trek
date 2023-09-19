const fs = require('fs');
/** @type {{teams: {id:number,name:string,score:number,history:{jsTimestamp:number,log:string}[],challengeStatus:Record<string,boolean[]|undefined>}[], challenges: {id: number, name: string}[]}} */
const data = JSON.parse(fs.readFileSync('./tt2.json', 'utf8'));

const [min, max] = data.teams.reduce((a, team) => {
    const [min, max] = team.history.reduce((aa, history) => [
        Math.min(aa[0], history.jsTimestamp), Math.max(aa[1], history.jsTimestamp)
    ], [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]);
    return [Math.min(min, a[0]), Math.max(max, a[1])];
}, [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]);

console.log(min, max);

const PADDING = 60*1000;

//Complete (true|false) challenge ([0-9]+) for points ([-0-9]+)

/** @type {{teamId: number, challengeId: number, pointChange: number, jsTimestamp: number}[]} */
const allLogs = data.teams.reduce((acc, team) => acc.concat(team.history.reduce((a, entry) => {
    const parse = /Complete (true|false) challenge ([0-9]+) for points ([-0-9]+)/.exec(entry.log);
    if (!parse || parse.length < 4 || parse[1] !== 'true') {
        throw new Error("Count not parse", entry.log);
    }
    return a.concat({
        teamId: team.id,
        challengeId: parseInt(parse[2]),
        pointChange: parseInt(parse[3]),
        jsTimestamp: entry.jsTimestamp
    });
}, [])), []).sort((a, b) => a.jsTimestamp - b.jsTimestamp);

const teamScoreTally = Array.from(Array(data.teams.length)).map(_ => 0);

/** @type {{vals: {jsTimestamp: number, scores: number[]}[]}} */
const outputJson = {vals: []};

const logger = fs.createWriteStream('out.csv', {
    flags: 'w'
});
logger.write(`${teamScoreTally.reduce((a, _, i) => `${a},${i+1}`, '')}\n`);
logger.write(`${min-PADDING}${teamScoreTally.reduce(a => `${a},0`, '')}\n`);

outputJson.vals.push({jsTimestamp: min - PADDING, scores: teamScoreTally.slice()});

const seen = new Set();

allLogs.forEach((logEntry) => {
    if (seen.has(logEntry.jsTimestamp)) {
        console.log(`\tDUPLICATE: ${logEntry.jsTimestamp}`);
    }
    seen.add(logEntry.jsTimestamp);
    logger.write(`${logEntry.jsTimestamp}`);
    teamScoreTally[logEntry.teamId] += logEntry.pointChange;
    logger.write(teamScoreTally.reduce((a, x) => `${a},${x}`, ''));
    logger.write('\n');
    outputJson.vals.push({jsTimestamp: logEntry.jsTimestamp, scores: teamScoreTally.slice()});
});
logger.write(`${max+PADDING}${teamScoreTally.reduce((a, x) => `${a},${x}`, '')}\n`);
outputJson.vals.push({jsTimestamp: max + PADDING, scores: teamScoreTally.slice()});
fs.writeFileSync('out.json', JSON.stringify(outputJson));




const challengeData = data.challenges.map((challenge) => ({
    name: challenge.name,
    teams: data.teams.map((team) => !!(team.challengeStatus[`${challenge.id}`]?.every(x => x)))
}));
fs.writeFileSync('challenges.json', JSON.stringify(challengeData));