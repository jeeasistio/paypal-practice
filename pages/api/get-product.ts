import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../helpers/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const product = await prisma.product.findFirst({ where: { id: (req.query.id as string) ?? '' } })

    if (!product) {
        res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json(product)
}
