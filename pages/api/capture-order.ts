import type { NextApiRequest, NextApiResponse } from 'next'
import { captureOrder } from '../../helpers/paypal'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const capturedOrder = await captureOrder(req.body.id)

    res.status(200).json({})
}
