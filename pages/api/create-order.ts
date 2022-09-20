import type { NextApiRequest, NextApiResponse } from 'next'
import { createOrder } from '../../helpers/paypal'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const createdOrder = await createOrder(req.body.id)

    res.status(200).json(createdOrder)
}
