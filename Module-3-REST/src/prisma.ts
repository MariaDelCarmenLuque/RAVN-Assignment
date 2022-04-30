import { PrismaClient } from '@prisma/client'
import { NotFound } from 'http-errors'

export const prisma = new PrismaClient({
    // rejectOnNotFound: (error) => new NotFound(error.message),
})
async function main() {
}
main()
.catch((e)=> {

})
.finally(async () => {
    await prisma.$disconnect()
})