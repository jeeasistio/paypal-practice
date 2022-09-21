import { Product } from '@prisma/client'
import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Products from '../components/Products'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    const [products, setProducts] = useState<Product[]>()

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('/api/get-products')
            setProducts(res.data)
        }

        fetchProducts()
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Product Purchase</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />

            <main className={styles.main}>
                <div>
                    <Products products={products} />
                </div>
            </main>
        </div>
    )
}

export default Home
