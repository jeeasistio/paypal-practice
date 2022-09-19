import React from 'react'
import { IProduct } from '../lib/products'
import { PayPalButtons } from '@paypal/react-paypal-js'

const Product = ({ name, description, price }: IProduct) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>

            <h1>$ {price}</h1>

            <PayPalButtons style={{ layout: 'horizontal' }} />
        </div>
    )
}

export default Product
