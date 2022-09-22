import type { NextApiRequest, NextApiResponse } from 'next'
import { createOrder } from '../../helpers/paypal'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const createdOrder = await createOrder(req.body.id, Number(req.body.quantity))

    if (createdOrder === null) {
        res.status(500).json({ message: 'Something went wrong' })
    }

    res.status(200).json(createdOrder)
}
