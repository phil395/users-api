import { PrismaClient } from '@prisma/client'
import { users } from '../mock/users'

const prisma = new PrismaClient()

async function main() {
  const count = await prisma.user.findUnique({ where: { email: 'alice@gmail.com' } })
  console.log(count)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })