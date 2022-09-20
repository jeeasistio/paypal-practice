import paypal from '@paypal/checkout-server-sdk'
import { products } from '../lib/products'

const environment = new paypal.core.SandboxEnvironment(
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
)
const client = new paypal.core.PayPalHttpClient(environment)

export const createOrder = async (productId: string) => {
    const product = products.find((product) => product.id === productId)!

    const { name, price, description } = product

    const request = new paypal.orders.OrdersCreateRequest()
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                description: `${name} purchase`,
                amount: {
                    currency_code: 'USD',
                    value: `${price}.00`,
                    breakdown: {
                        item_total: { value: `${price}.00`, currency_code: 'USD' },
                        discount: { value: `0`, currency_code: 'USD' },
                        handling: { currency_code: 'USD', value: '0' },
                        insurance: { currency_code: 'USD', value: '0' },
                        shipping: { currency_code: 'USD', value: '0' },
                        shipping_discount: { currency_code: 'USD', value: '0' },
                        tax_total: { value: '0', currency_code: 'USD' },
                    },
                },
                items: [
                    {
                        name,
                        category: 'PHYSICAL_GOODS' as paypal.orders.Category,
                        quantity: '1',
                        unit_amount: { value: `${price}.00`, currency_code: 'USD' },
                        description,
                    },
                ],
            },
        ],
    })

    const response = await client.execute(request)
    console.log('🚀 ~ file: paypal.ts ~ line 48 ~ createOrder ~ response', response)

    return response
}

export const captureOrder = async (orderId: string) => {
    const request = new paypal.orders.OrdersCaptureRequest(orderId)

    const response = await client.execute(request)
    console.log('🚀 ~ file: paypal.ts ~ line 55 ~ captureOrder ~ response', response)
}
