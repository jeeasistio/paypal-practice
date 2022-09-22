import paypal from '@paypal/checkout-server-sdk'
import { prisma } from './prisma'

export interface CreateOrder {
    id: string
    intent: string
    status: string
    purchase_units: CreatePurchaseUnit[]
    create_time: Date
    links: Link[]
}

interface Link {
    href: string
    rel: string
    method: string
}

interface CreatePurchaseUnit {
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
    item_total: ValueCurrency
    shipping: ValueCurrency
    handling: ValueCurrency
    tax_total: ValueCurrency
    insurance: ValueCurrency
    shipping_discount: ValueCurrency
    discount: ValueCurrency
}

interface ValueCurrency {
    currency_code: string
    value: string
}

interface Item {
    name: string
    unit_amount: ValueCurrency
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
    purchase_units: CapturePurchaseUnit[]
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
interface CapturePurchaseUnit {
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

export const createOrder = async (productId: string, quantity: number) => {
    try {
        const product = await prisma.product.findFirst({ where: { id: productId } })
        const user = await prisma.user.findFirst()

        if (!product) return null
        if (!user) return null

        const { name, price, description } = product

        const request = new paypal.orders.OrdersCreateRequest()
        request.prefer('return=representation')
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    description: `${name} Purchase`,
                    amount: {
                        currency_code: 'USD',
                        value: (price * quantity).toFixed(2),
                        breakdown: {
                            item_total: { value: (price * quantity).toFixed(2), currency_code: 'USD' },
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
                            quantity: quantity.toString(),
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

        await prisma.paypal.create({
            data: {
                purchase_info: {
                    amount: requestResult.purchase_units[0].amount,
                    description: requestResult.purchase_units[0].description,
                    payee: requestResult.purchase_units[0].payee,
                    items: requestResult.purchase_units[0].items,
                },
                Purchases: {
                    create: {
                        product_id: product.id,
                        user_id: user.id,
                        order_id: requestResult.id,
                        status: requestResult.status,
                    },
                },
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

        const requestResult = (await client.execute(request)).result as CaptureOrder

        await prisma.purchases.update({
            where: { order_id: orderId },
            data: {
                status: requestResult.status,
                paypal: {
                    update: {
                        payer_info: {
                            address: requestResult.payer.address,
                            id: requestResult.payer.payer_id,
                            name: requestResult.payer.name,
                            email: requestResult.payer.email_address,
                        },
                    },
                },
            },
        })

        return requestResult
    } catch (error) {
        return null
    }
}
