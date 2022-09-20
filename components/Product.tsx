import React from 'react'
import { IProduct } from '../lib/products'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { captureOrder, createOrder } from '../helpers/paypal'

const Product = ({ name, description, price, id }: IProduct) => {
    const handleCreateOrder: NonNullable<typeof PayPalButtons['defaultProps']>['createOrder'] = async () => {
        const order = await createOrder(id)
        return order.result.id
    }

    const handleOnApprove: NonNullable<typeof PayPalButtons['defaultProps']>['onApprove'] = async (data) => {
        await captureOrder(data.orderID)
    }

    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>

            <h1>$ {price}</h1>

            <PayPalButtons
                style={{ layout: 'horizontal' }}
                createOrder={handleCreateOrder}
                onApprove={handleOnApprove}
            />
        </div>
    )
}

export default Product
