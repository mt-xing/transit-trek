"use client"

import { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./admin.module.css";
import { Challenge, DbInfo, Team } from "../types";
import { CLIENT_ID, REDIRECT_URI } from "./consts";

type PageState = "home" | "teams" | "challenges" | "entry";

const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=email&response_type=token&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}`;

const AdminPage = () => {
    const [token, setToken] = useState<string | null>(null);
    const [state, setState] = useState<PageState>("home");
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fragmentString = location.hash.substring(1);

        const params: Record<string, string> = {};
        const regex = /([^&=]+)=([^&]*)/g
        let m;
        while (m = regex.exec(fragmentString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        if (!params.access_token) {
            location.href = loginUrl;
            return;
        }

        const token: string = params.access_token;

        fetch("/api/private-get", {
            headers: {
                token,
            },
        }).then(d => {
            if (d.status !== 200) {
                alert("Failed to fetch"); return;
            }
            d.json().then(x => {
                console.log(x);
                setTeams(x.teams);
                setChallenges(x.challenges);
                if (x.teams && x.challenges) {
                    setToken(token);
                } else {
                    alert("ERROR: Fetch failed");
                }
            });
        }).catch(() => alert("failed to fetch"));
    }, []);

    useEffect(() => {
        if (!token){ return; }
        const data: DbInfo = {
            teams, challenges
        };
        fetch("/api/private-save", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                token,
            },
        }).then(res => {
            if (res.status !== 200) {
                alert("Failed to save");
            }
        }).catch(() => alert("Failed to save"));
    }, [challenges, teams, token]);

    const homePage = useMemo(() => <>
        <p>Challenges: {challenges.length}</p>
        <ol>
        {
          teams.map((t) => <li key={t.id}>Team {t.id + 1}: {t.name} ({t.score})</li>)
        }
        </ol>
        <button onClick={() => setState("challenges")}>Edit Challenges</button>
        <button onClick={() => setState("teams")}>Edit Teams</button>
        <button onClick={() => setState("entry")}>Enter Points</button>
    </>, [challenges, teams]);

    const [ucName, setUcName] = useState<string>("");
    const [ucPoint, setUcPoint] = useState<number>(0);
    const [ucDesc, setUcDesc] = useState<string>("");
    const [ucType, setUcType] = useState<Challenge["type"]>({t: "one"});
    const addChallenge = useCallback(() => {
        if (!ucName) {return;}
        setChallenges(cs => cs.concat({id: cs.length, name: ucName, point: ucPoint, desc: ucDesc, type: ucType}));
        setUcName("");
        setUcPoint(0);
        setUcDesc("");
        setUcType({t: "one"});
    }, [ucName, ucPoint, ucDesc, ucType]);
    // INVARIANT: Challenge ID must be maintained manually and be dense starting at 0
    const challengePage = useMemo(() => <>
        <h2>Edit Challenges</h2>
        <ol>
            {challenges.map((challenge, i) => <li key={challenge.id}>
                <input placeholder="Title" type="text" value={challenge.name} onChange={e => setChallenges(cs => cs.map(t => t.id === challenge.id ? {...t, name: e.target.value} : t))} />
                <br />
                <input placeholder="Desc" type="text" value={challenge.desc} onChange={e => setChallenges(cs => cs.map(t => t.id === challenge.id ? {...t, desc: e.target.value} : t))} />
                <br />
                Points: <input type="number" value={challenge.point} onChange={e => setChallenges(cs => cs.map(t => t.id === challenge.id ? {...t, point: parseFloat(e.target.value)} : t))} />
                <br />
                Type: <select value={challenge.type.t} onChange={e => setChallenges(cs => cs.map(t => t.id === challenge.id ? {...t, type: e.target.value === "multiple" ? {t: "multiple", num: 2} : {t: e.target.value as "one" | "unlimited"}} : t))}><option value="one">One and Done</option><option value="multiple">Multi-Part</option><option value="unlimited">Unlimited</option></select>
                {challenge.type.t === "multiple" ? <input type="number" value={challenge.type.num} onChange={e => setChallenges(cs => cs.map(t => t.id === challenge.id ? {...t, type: {t: "multiple", num: parseInt(e.target.value)}} : t))} /> : null}
                <br />
                <button onClick={() => setChallenges(ts => ts.filter(x => x.id !== challenge.id).map((x, i) => ({...x, id: i})))}>DELETE</button>
                {i !== 0 ? <button onClick={() => setChallenges(cs => cs.slice(0, i-1).concat(challenge).concat(cs[i-1]).concat(cs.slice(i+1)))}>&uarr;</button> : <div style={{display: "inline-block", width: "24px"}}></div>}
                {i !== challenges.length - 1 ? <button onClick={() => setChallenges(cs => cs.slice(0, i).concat(cs[i+1]).concat(challenge).concat(cs.slice(i+2)))}>&darr;</button> : null}
            </li>)}
        </ol>
        <div>
            <p>Add challenge:</p>
            Name: <input placeholder="Challenge Name" type="string" value={ucName} onChange={e => setUcName(e.target.value)} />
            Points: <input placeholder="Challenge Name" type="number" value={ucPoint} onChange={e => setUcPoint(parseFloat(e.target.value))} />
            Desc: <input placeholder="Challenge Desc" type="string" value={ucDesc} onChange={e => setUcDesc(e.target.value)} />
            Type: <select value={ucType.t} onChange={e => setUcType(e.target.value === "multiple" ? {t: "multiple", num: 2} : {t: e.target.value as "one" | "unlimited"})}><option value="one">One and Done</option><option value="multiple">Multi-Part</option><option value="unlimited">Unlimited</option></select> {
                ucType.t === 'multiple' ? <input type="number" value={ucType.num} onChange={e => setUcType({t: "multiple", num: parseInt(e.target.value)})} style={{width: "40px"}} /> : null
            }
            <button onClick={addChallenge}>Add Challenge</button>
        </div>
        <p><button onClick={() => setState("home")}>Done</button></p>
    </>, [challenges, ucName, addChallenge, ucDesc, ucPoint, ucType]);

    const [unsetTeam, setUnsetTeam] = useState<string>("");
    const addTeam = useCallback(() => {
        if (!unsetTeam) {return;}
        setTeams(t => t.concat({id: t.length, name: unsetTeam, score: 0, history: [], challengeStatus: {}}));;
        setUnsetTeam("");
    }, [unsetTeam]);
    // INVARIANT: Team ID must be maintained manually and be dense starting at 0
    const teamsPage = useMemo(() => <>
        <h2>Edit Teams</h2>
        <ol>
            {teams.map((team, i) => <li key={team.id}>
                <input type="text" value={team.name} onChange={e => setTeams(ts => ts.map(t => t.id === team.id ? {...t, name: e.target.value} : t))} />
                <button onClick={() => setTeams(ts => ts.filter(x => x.id !== team.id).map((x, i) => ({...x, id: i})))}>DELETE</button>
                {i !== 0 ? <button onClick={() => setTeams(ts => ts.slice(0, i-1).concat(team).concat(ts[i-1]).concat(ts.slice(i+1)))}>&uarr;</button> : <div style={{display: "inline-block", width: "24px"}}></div>}
                {i !== teams.length - 1 ? <button onClick={() => setTeams(ts => ts.slice(0, i).concat(ts[i+1]).concat(team).concat(ts.slice(i+2)))}>&darr;</button> : null}
            </li>)}
        </ol>
        <div>
            <p>Add team:</p>
            <input placeholder="Team Name" type="string" value={unsetTeam} onChange={e => setUnsetTeam(e.target.value)} />
            <button onClick={addTeam}>Add Team</button>
        </div>
        <p><button onClick={() => setState("home")}>Done</button></p>
    </>, [teams, unsetTeam, addTeam]);

    const [selTeam, setSelTeam] = useState<number>(-1);
    const [selChal, setSelChal] = useState<number>(-1);
    const teamChallengePointChange = useCallback((teamId: number, challenge: Challenge, status: boolean) => {
        setTeams(teams => teams.map(t => t.id !== teamId ? t : {
            ...t,
            score: t.score + (status ? 1 : -1) * challenge.point,
            history: t.history.concat({
                jsTimestamp: (new Date()).getTime(),
                log: `Complete ${status} challenge ${challenge.id} for points ${challenge.point}`,
            })
        }));
    }, []);
    const entryPage = useMemo(() => <>
        <p>Team: <select value={selTeam} onChange={e => setSelTeam(parseInt(e.target.value))}><option value="-1">PICK</option>{teams.map(t => <option key={t.id} value={t.id}>{(t.id + 1)}: {t.name}</option>)}</select></p>
        <p>Challenge: <select value={selChal} onChange={e => setSelChal(parseInt(e.target.value))}><option value="-1">PICK</option>{challenges.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></p>
        {
            selTeam !== -1 && selChal !== -1 && teams[selTeam] && challenges[selChal] ? <>
                <h2>Challlenge Status</h2>
                <p>Team: {teams[selTeam].name}</p>
                <p>Challenge: {challenges[selChal].name}</p>
                {challenges[selChal].desc ? <p>{challenges[selChal].desc}</p> : null}
                <p>{challenges[selChal].point} Point(s)</p>
                {
                    (() => {
                        const challenge = challenges[selChal];
                        const team = teams[selTeam];
                        switch(challenge.type.t) {
                            case "one": {
                                const a = team.challengeStatus[selChal];
                                const done = a ? a[0] : false;
                                return <>
                                {!done ? "Incomplete; check box to complete" : "Complete"}
                                <br />
                                <input type="checkbox" checked={done} onChange={e => {
                                    const d = e.target.checked;
                                    setTeams(ts => ts.map(t => t.id !== team.id ? t : {...t, challengeStatus: {...t.challengeStatus, [challenge.id]: [d]}}));
                                    teamChallengePointChange(team.id, challenge, d);
                                }} />
                                </>;
                            }
                            case "multiple": {
                                const arr = (() => {
                                    const aRaw = team.challengeStatus[selChal];
                                    if (!aRaw) {return Array.from(Array(challenge.type.num)).map(_ => false);}
                                    if (aRaw.length === challenge.type.num) {return aRaw;}
                                    if (aRaw.length < challenge.type.num) {return aRaw.concat(Array.from(Array(challenge.type.num - aRaw.length)).map(_ => false))}
                                    return aRaw.slice(0, challenge.type.num);
                                })();
                                return <ol>{arr.map((x, i) => <li key={i}>
                                    <input type="checkbox" checked={x} onChange={e => setTeams(ts => ts.map(t => t.id !== team.id ? t : {...t, challengeStatus: {...t.challengeStatus, [challenge.id]: (() => {
                                        const x = arr.slice();
                                        x[i] = e.target.checked;
                                        if (x.every(y => y) && arr.some(y => !y)) {
                                            teamChallengePointChange(team.id, challenge, true);
                                        } else if (x.some(y => !y) && arr.every(x => x)) {
                                            teamChallengePointChange(team.id, challenge, false);
                                        }
                                        return x;
                                    })()}}))} />
                                </li>)}</ol>;
                            }
                            case "unlimited": {
                                const a = team.challengeStatus[selChal];
                                const arr = a ? a.length : 0;
                                return <>
                                    {/* <input type="number" value={arr} onChange={e => setTeams(ts => ts.map(t => t.id !== team.id ? t : {...t, challengeStatus: {...t.challengeStatus, [challenge.id]: Array.from(Array(parseInt(e.target.value))).map(_ => true)}}))} /> */}
                                    Completed <span style={{fontSize: "3em"}}>{arr}</span> time(s)
                                    <br />
                                    <button onClick={e => {
                                        setTeams(ts => ts.map(t => t.id !== team.id ? t : {...t, challengeStatus: {...t.challengeStatus, [challenge.id]: Array.from(Array(arr+1)).map(_ => true)}}));
                                        teamChallengePointChange(team.id, challenge, true);
                                    }}>+ Add One</button>
                                    <button onClick={e => {
                                        setTeams(ts => ts.map(t => t.id !== team.id ? t : {...t, challengeStatus: {...t.challengeStatus, [challenge.id]: Array.from(Array(arr-1 > 0 ? arr-1 : 0)).map(_ => true)}}));
                                        teamChallengePointChange(team.id, challenge, false);
                                    }}>- Sub One</button>
                                </>;
                            }
                        }
                    })()
                }
            </> : null
        }
        <p><button onClick={() => {setState("home");setSelTeam(-1);setSelChal(-1);}}>Done</button></p>
    </>, [selTeam, selChal, teams, challenges, teamChallengePointChange]);

    const pageContents = useMemo(() => {
        switch (state) {
            case "home":
                return homePage;
            case "challenges":
                return challengePage;
            case "entry":
                return entryPage;
            case "teams":
                return teamsPage;
            default:
                ((x: never) => {throw new Error(x);})(state);
        }
    }, [state, homePage, teamsPage, challengePage, entryPage]);
    return <div className={styles.adminWrap}>
        <h1>Super Secret Admin Page</h1>
        {token ? pageContents : "LOADING"}
    </div>;
};
export default AdminPage;