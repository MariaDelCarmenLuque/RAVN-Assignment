import { PrismaClient } from '@prisma/client'
import { NotFound } from 'http-errors'

export const prisma = new PrismaClient()
async function main() {
    // rejectOnNotFound: (error) => new NotFound(error.message),
  
}
main()
.catch((e)=> {

})
.finally(async () => {
    await prisma.$disconnect()
})