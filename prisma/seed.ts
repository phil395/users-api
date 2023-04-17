import { PrismaClient } from '@prisma/client'
import { users } from '../mock/users'

const prisma = new PrismaClient()

async function main() {
  for (const user of users) {
    await prisma.user.upsert({
      create: user,
      update: user,
      where: {
        email: user.email
      }
    })
  }
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