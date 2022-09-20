import { Product as IProduct } from '@prisma/client'
import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Product from '../components/Product'
import styles from '../styles/Home.module.css'

const Phone: NextPage = () => {
    const router = useRouter()
    const [product, setProduct] = useState<IProduct>()

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`/api/get-product/?id=${router.query.id}`)
            setProduct(res.data)
        }

        fetchProduct()
    }, [router.query.id])

    return (
        <div className={styles.container}>
            <Head>
                <title>Product Purchase</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div>{product && <Product {...product} />}</div>
            </main>
        </div>
    )
}

export default Phone
