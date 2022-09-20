import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const user = {
    name: 'John Doe',
}

const products = [
    {
        name: 'Phone XL',
        price: 99,
        description: 'A large phone with one of the best screens',
    },
    {
        name: 'Phone Mini',
        price: 199,
        description: 'A phone with vivid colors for a compact phone',
    },
    {
        name: 'Phone Pro',
        price: 299,
        description: 'A great phone with one of the best cameras',
    },
]

async function main() {
    await prisma.user.create({ data: user })
    await prisma.product.createMany({ data: products })
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })
