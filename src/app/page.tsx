"use client"

import { PUBLIC_GET_TOKEN } from "./consts";
import styles from "./home.module.css";
import { useEffect, useState } from "react";

type TeamInfo = {id: number, name: string, score: number};

export default function Home() {
  const [teams, setTeams] = useState<TeamInfo[]>([]);

  useEffect(() => {
    fetch("/api/public-get", {headers: {token: PUBLIC_GET_TOKEN}}).then(res => {
      res.json().then(x => setTeams(x.teams ?? []));
    });

    const interval = setInterval(() => {
      fetch("/api/public-get", {headers: {token: PUBLIC_GET_TOKEN}}).then(res => {
        res.json().then(x => setTeams(x.teams ?? []));
      });
    }, 15*1000);
  
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className={styles.homeWrap}>
      <header className={styles.homeHeader}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <h1><img src='/trek.png' alt="" /></h1>
      </header>
      <main className={styles.homeRank}>
        <h1>Team Rankings</h1>
        <ol>
        {
          teams?.map((t) => <li key={t.id}>Team {t.id + 1}: {t.name} ({t.score} point{t.score === 1 ? "" : "s"})</li>)
        }
        </ol>
      </main>
    </div>
  )
}
