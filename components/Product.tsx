import axios from 'axios'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { CreateOrder } from '../helpers/paypal'
import { Product } from '@prisma/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Product = ({ name, description, price, id }: Product) => {
    const [quantity, setQuantity] = useState(1)

    const router = useRouter()
    const handleCreateOrder: NonNullable<typeof PayPalButtons['defaultProps']>['createOrder'] = async () => {
        const res = await axios.post<CreateOrder>('/api/create-order', { id, quantity })
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

            <div style={{ marginBottom: 12 }}>
                <label htmlFor="quantity">Quantity: </label>
                <input
                    id="quantity"
                    min={1}
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    style={{ padding: 8 }}
                />
            </div>

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
