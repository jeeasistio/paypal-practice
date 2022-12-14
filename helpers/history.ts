import { prisma } from './prisma'

export type THistory = Awaited<ReturnType<typeof getHistory>>

export const getHistory = async (userId: string) => {
    const history = await prisma.purchases.findMany({
        where: { user_id: userId, status: 'COMPLETED' },
        include: { Product: true, Paypal: true },
    })

    return history
}
