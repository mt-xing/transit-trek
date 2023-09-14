import styles from "./home.module.css"

export default function Home() {
  const teams = [
    {id: 1, name: "test name", score: 2},
    {id: 2, name: "another team", score: 5}, 
    {id: 3, name: "hello world", score: 12},
  ].sort((a, b) => b.score - a.score);

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
          teams.map((t) => <li key={t.id}>Team {t.id}: {t.name} ({t.score})</li>)
        }
        </ol>
      </main>
    </div>
  )
}
