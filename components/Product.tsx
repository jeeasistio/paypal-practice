import React from 'react'
import axios from 'axios'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { CreateOrder } from '../helpers/paypal'
import { Product } from '@prisma/client'
import { useRouter } from 'next/router'

const Product = ({ name, description, price, id }: Product) => {
    const router = useRouter()
    const handleCreateOrder: NonNullable<typeof PayPalButtons['defaultProps']>['createOrder'] = async () => {
        const res = await axios.post<CreateOrder>('/api/create-order', { id })
        return res.data.id
    }

    const handleOnApprove: NonNullable<typeof PayPalButtons['defaultProps']>['onApprove'] = async (data) => {
        const res = await axios.post<CreateOrder>('/api/capture-order', { id: data.orderID })

        if (res.status === 200) {
            router.push('/history')
        }
    }

    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>

            <h1>$ {price}</h1>

            <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={handleCreateOrder}
                onApprove={handleOnApprove}
                onError={() => {}}
            />
        </div>
    )
}

export default Product
