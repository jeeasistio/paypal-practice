import type { NextApiRequest, NextApiResponse } from 'next'
import { getHistory } from '../../helpers/history'
import { prisma } from '../../helpers/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = await prisma.user.findFirst()
    if (user === null) {
        return res.status(500).json({ message: 'No user found' })
    }

    const history = await getHistory(user.id)

    res.status(200).json(history)
}
