"use client"

import { useCallback, useEffect, useMemo, useState } from "react";

type PageState = "home" | "teams" | "challenges" | "entry";

type TeamInfo = {
    id: number;
    name: string;
    score: number;
    history: {jsTimestamp: number, }[];
};

const AdminPage = () => {
    const [state, setState] = useState<PageState>("home");
    const [teams, setTeams] = useState<TeamInfo[]>([]);
    const [unsetTeam, setUnsetTeam] = useState<string>("");

    const homePage = useMemo(() => <>
        <button onClick={() => setState("challenges")}>Edit Challenges</button>
        <button onClick={() => setState("teams")}>Edit Teams</button>
        <button onClick={() => setState("entry")}>Enter Points</button>
    </>, []);

    const addTeam = useCallback(() => {
        if (!unsetTeam) {return;}
        setTeams(t => t.concat({id: t.length, name: unsetTeam, score: 0, history: []}));;
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

    const pageContents = useMemo(() => {
        switch (state) {
            case "home":
                return homePage;
            case "challenges":
            case "entry":
                return <>hi</>;
            case "teams":
                return teamsPage;
            default:
                ((x: never) => {throw new Error(x);})(state);
        }
    }, [state, homePage, teamsPage]);
    return <>
        <h1>Super Secret Admin Page</h1>
        {pageContents}
    </>;
};
export default AdminPage;