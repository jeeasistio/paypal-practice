import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const History: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>History</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div>
                    <h1>History</h1>
                </div>
            </main>
        </div>
    )
}

export default History
