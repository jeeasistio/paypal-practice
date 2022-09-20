// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { captureOrder } from '../../helpers/paypal'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await captureOrder(req.body.id)

    res.status(200).json({})
}
