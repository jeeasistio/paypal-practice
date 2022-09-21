import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import HistoryList from '../components/History'
import Nav from '../components/Nav'
import { THistory } from '../helpers/history'
import styles from '../styles/Home.module.css'

const History: NextPage = () => {
    const [history, setHistory] = useState<THistory>()

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await axios.get('/api/get-history')
            setHistory(res.data)
        }

        fetchHistory()
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>History</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />

            <main className={styles.main}>
                <div>
                    <h1>History</h1>

                    <HistoryList history={history} />
                </div>
            </main>
        </div>
    )
}

export default History
