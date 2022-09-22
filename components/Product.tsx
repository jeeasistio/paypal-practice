import axios from 'axios'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { CreateOrder } from '../helpers/paypal'
import { Product } from '@prisma/client'
import { useRouter } from 'next/router'
import { ChangeEventHandler, useState } from 'react'

const Product = ({ name, description, price, id }: Product) => {
    const [quantity, setQuantity] = useState(1)
    const [confirmedQuantity, setConfirmedQuantity] = useState(quantity)

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

    const handleQuantity: ChangeEventHandler<HTMLInputElement> = (e) => {
        setQuantity(Number(e.target.value))
    }

    const handleConfirmQuantity = () => {
        setConfirmedQuantity(quantity)
    }

    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>

            <h1>$ {price.toFixed(2)}</h1>

            <div>
                <h2>Total</h2>
                <h1 color="#ff5050">$ {(price * Number(confirmedQuantity)).toFixed(2)}</h1>
            </div>

            <div style={{ marginBottom: 12 }}>
                <label htmlFor="quantity">Quantity: </label>
                <input
                    id="quantity"
                    min={1}
                    type="number"
                    value={quantity}
                    onChange={handleQuantity}
                    style={{ padding: 8, marginRight: 8 }}
                />
                <button onClick={handleConfirmQuantity} style={{ padding: '8px 16px' }}>
                    Confirm
                </button>
            </div>

            <PayPalButtons
                forceReRender={[confirmedQuantity]}
                style={{ layout: 'vertical' }}
                createOrder={handleCreateOrder}
                onApprove={handleOnApprove}
                onError={() => {}}
            />
        </div>
    )
}

export default Product
