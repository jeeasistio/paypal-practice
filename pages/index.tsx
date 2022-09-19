import type { NextPage } from 'next'
import Head from 'next/head'
import Products from '../components/Products'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Product Purchase</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div>
                    <Products />
                </div>
            </main>
        </div>
    )
}

export default Home
