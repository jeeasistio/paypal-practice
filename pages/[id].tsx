import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Product from '../components/Product'
import { products } from '../lib/products'
import styles from '../styles/Home.module.css'

const Phone: NextPage = () => {
    const router = useRouter()

    const product = products.find((product) => product.id === router.query.id)

    return (
        <div className={styles.container}>
            <Head>
                <title>Product Purchase</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div>
                    {product && <Product {...product} />}
                </div>
            </main>
        </div>
    )
}

export default Phone
