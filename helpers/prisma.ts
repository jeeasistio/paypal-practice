import { PrismaClient } from '@prisma/client'

declare const global: any

export const prisma = new PrismaClient()
