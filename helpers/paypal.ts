import paypal from '@paypal/checkout-server-sdk'
import { prisma } from './prisma'

export interface CreateOrder {
    id: string
    status: string
    links: Link[]
}

interface Link {
    href: string
    rel: string
    method: string
}

interface PurchaseUnit {
    reference_id: string
    amount: Amount
    payee: Payee
    description: string
    items: Item[]
}

interface Amount {
    currency_code: string
    value: string
    breakdown: Breakdown
}

interface Breakdown {
    item_total: Discount
    shipping: Discount
    handling: Discount
    tax_total: Discount
    insurance: Discount
    shipping_discount: Discount
    discount: Discount
}

interface Discount {
    currency_code: string
    value: string
}

interface Item {
    name: string
    unit_amount: Discount
    quantity: string
    description: string
    category: string
}

interface Payee {
    email_address: string
    merchant_id: string
}

interface Link {
    href: string
    rel: string
    method: string
}

export interface CaptureOrder {
    id: string
    status: string
    purchase_units: PurchaseUnitt[]
    payer: Payer
    links: Link[]
}
interface Payer {
    name: Name
    email_address: string
    payer_id: string
    address: Address
}
interface Name {
    given_name: string
    surname: string
}
interface Address {
    country_code: string
}
interface PurchaseUnitt {
    reference_id: string
    payments: Payments
}

interface Payments {
    captures: CaptureElement[]
}
interface CaptureElement {
    id: string
    status: string
    amount: Amount
    final_capture: boolean
    seller_protection: SellerProtection
    seller_receivable_breakdown: SellerReceivableBreakdown
    links: Link[]
    create_time: Date
    update_time: Date
}
interface SellerProtection {
    status: string
    dispute_categories: string[]
}

interface SellerReceivableBreakdown {
    gross_amount: Amount
    paypal_fee: Amount
    net_amount: Amount
}

const environment = new paypal.core.SandboxEnvironment(
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
)
const client = new paypal.core.PayPalHttpClient(environment)

export const createOrder = async (productId: string) => {
    try {
        const product = await prisma.product.findFirst({ where: { id: productId } })
        const user = await prisma.user.findFirst()

        if (!product) return null
        if (!user) return null

        const { name, price, description } = product

        const request = new paypal.orders.OrdersCreateRequest()
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    description: `${name} purchase`,
                    amount: {
                        currency_code: 'USD',
                        value: price.toFixed(2),
                        breakdown: {
                            item_total: { value: price.toFixed(2), currency_code: 'USD' },
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
                            unit_amount: { value: price.toFixed(2), currency_code: 'USD' },
                            description,
                        },
                    ],
                },
            ],
            application_context: {
                shipping_preference: 'NO_SHIPPING',
            },
        })

        const requestResult = (await client.execute(request)).result as CreateOrder

        await prisma.purchases.create({
            data: {
                productId: product.id,
                userId: user.id,
                status: requestResult.status,
                orderID: requestResult.id,
            },
        })

        return requestResult
    } catch (error) {
        return null
    }
}

export const captureOrder = async (orderId: string) => {
    try {
        const request = new paypal.orders.OrdersCaptureRequest(orderId)

        return (await client.execute(request)).result as CaptureOrder
    } catch (error) {
        return null
    }
}
