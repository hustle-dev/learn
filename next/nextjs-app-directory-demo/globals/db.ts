import { PrismaClient } from '@prisma/client'
// Prisma는 서버 사이드에서만 사용할 수 있으므로 server-only를 가져온다.
import 'server-only'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
