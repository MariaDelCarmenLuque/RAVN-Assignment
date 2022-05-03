import { PrismaClient } from '@prisma/client'
import { NotFound } from 'http-errors'

export const prisma = new PrismaClient({
    // rejectOnNotFound: (error) => new NotFound(error.message),
})
export async function clearDatabase(schema = 'public'): Promise<void> {
    const tablenames = await prisma.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname=${schema}`
  
    for (const { tablename } of tablenames) {
      if (tablename !== '_prisma_migrations') {
        try {
          await prisma.$executeRawUnsafe(
            `TRUNCATE TABLE "${schema}"."${tablename}" CASCADE;`,
          )
        } catch (error) {
          console.error({ error })
        }
      }
    } }
async function main() {
}
main()
.catch((e)=> {

})
.finally(async () => {
    await prisma.$disconnect()
})