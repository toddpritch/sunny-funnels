import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/index.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Todd Pritch Funnels</title>
        <meta name="description" content="Landing pages for Todd Pritch's offers" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          <h1>Todd Pritch Funnels</h1>
          <p>Select an offer:</p>

          <div className={styles.grid}>
            <Link href="/call" className={styles.card}>
              <h2>Strategy Call</h2>
              <p>Book a 1:1 guitar strategy session with Todd to get a personalized roadmap for finishing your songs.</p>
              <span className={styles.link}>Visit /call →</span>
            </Link>

            <Link href="/cgm" className={styles.card}>
              <h2>Community</h2>
              <p>Join the Creative Guitar Mastery 3-month cohort. Get group coaching, resources, and community accountability.</p>
              <span className={styles.link}>Visit /cgm →</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
