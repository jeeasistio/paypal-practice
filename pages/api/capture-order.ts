import type { NextApiRequest, NextApiResponse } from 'next'
import { captureOrder } from '../../helpers/paypal'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const capturedOrder = await captureOrder(req.body.id)

    if (capturedOrder === null) {
        res.status(500).json({ message: 'Something went wrong' })
    }

    res.status(200).json({ message: 'Thank you for ordering' })
}
