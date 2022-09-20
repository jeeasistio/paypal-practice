// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { captureOrder, createOrder } from '../../helpers/paypal'

type NextApiRequestWithData = NextApiRequest & {
    id: string
}

export default async function handler(req: NextApiRequestWithData, res: NextApiResponse) {
    await captureOrder(req.body)
    console.log(req.body)

    res.status(200).json({})
}
