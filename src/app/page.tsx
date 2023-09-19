"use client"

// import { PUBLIC_GET_TOKEN } from "./consts";
import styles from "./home.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";

import finalStandings from './final_standings.json' assert { type: 'json' };
import finalData from './final_data.json' assert { type: 'json' };
import "chart.js/auto";
import { Line } from "react-chartjs-2";

type TeamInfo = {id: number, name: string, score: number};

// type CacheInfo = {teams: TeamInfo[], expires: number};
// const cacheKey = "trek-cache";

export default function Home() {
  const [teams, setTeams] = useState<TeamInfo[][] | null>(null);

  const setTeamInfo = useCallback((x: TeamInfo[]) => {
    const res: Map<number, TeamInfo[]> = new Map();
    x.forEach(team => {
      const existing = res.get(team.score)
      if (existing) {
        res.set(team.score, existing.concat(team));
      } else {
        res.set(team.score, [team]);
      }
    });
    const arr = Array.from(res).sort((a, b) => b[0] - a[0]).map(([_, teams]) => teams);
    setTeams(arr);
  }, []);

  const getInfo = useCallback(() => {
    // fetch("/api/public-get", {headers: {token: PUBLIC_GET_TOKEN}}).then(res => {
    //   res.json().then((x: {teams: TeamInfo[]}) => {
    //     setTeamInfo(x.teams ?? []);
    //     const c: CacheInfo = {
    //       teams: x.teams ?? [],
    //       expires: (new Date()).getTime() + 9*1000,
    //     };
    //     localStorage.setItem(cacheKey, JSON.stringify(c));
    //   });
    // });
    setTeamInfo(finalStandings.teams);
  }, [setTeamInfo]);

  useEffect(() => {

    // const cacheRaw = localStorage.getItem(cacheKey);
    // const cache: CacheInfo | undefined = cacheRaw ? JSON.parse(cacheRaw) : undefined;

    // if (!cache || cache.expires < (new Date()).getTime()) {
    //   getInfo();
    // } else {
    //   console.log("Stale cache; not going to refresh");
    //   setTeamInfo(cache.teams);
    // }

    // const interval = setInterval(getInfo, 10*1000);
  
    // return () => {
    //   clearInterval(interval);
    // }
    getInfo();
    //  }, [getInfo, setTeamInfo]);
    if (window.location.host !== "localhost:3000" && window.location.host !== "transit-trek.vercel.app") {
      window.location.href = "https://transit-trek.vercel.app";
    }
  }, [getInfo]);

  const lineGraphData = useMemo(() => {
    return Array
      .from(Array(finalStandings.teams.length))
      .map((_, teamId) => finalData.vals.map((val) => ({
        x: val.jsTimestamp,
        y: val.scores[teamId],
      })));
  }, [finalStandings.teams, finalData]);

  return (
    <>
      <div className={styles.homeWrap}>
        <header className={styles.homeHeader}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <h1><img src='/trek.png' alt="" /></h1>
          {/* <p>Standings refresh every 10 seconds.<br />Reloading the page does not speed that up.</p> */}
          <p>Thank you for playing!</p>
        </header>
        <main className={styles.homeRank}>
          <ol>
          {
            teams === null ? <li>Loading...</li> :
            teams.length === 0 ? <li>Scores will be displayed here when the game begins</li> :
            teams.map((t) => <li key={t[0].score} className={styles.rankLi}>
              {t[0].score} point{t[0].score === 1 ? "" : "s"}
              <ul>
                {t.map(tt => <li key={tt.id}>{tt.name}</li>)}
              </ul>
            </li>)
          }
          </ol>
        </main>
      </div>
      <div className={styles.summaryBlock}>
        <h2>Game Progression</h2>
        <Line data={{
          datasets: lineGraphData.map((d, i) => ({
            label: `Team ${i+1}`,
            data: d,
            fill: false,
            stepped: true,
          }))
        }} options={{
          scales: {
            xAxes: {
              type: "linear",
              ticks: {
                callback: val => new Date(parseInt(`${val}`)).toTimeString().split(' ')[0]
              },
              max: 1694912500000,
            }
          },
          elements: {
            point: {
              radius: 0,
              hitRadius: 5,
            }
          },
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (args) => new Date(parseInt(args[0].label.replaceAll(",", ""))).toTimeString().split(' ')[0]
              },
            },
          },
        }}/>
      </div>
    </>
  )
}
