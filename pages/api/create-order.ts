// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createOrder } from '../../helpers/paypal'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const result = await createOrder(req.body.id)

    res.status(200).json(result)
}
