import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
async function main() {
  const email = 'admin@local.dev'
  const password = 'admin123'
  const hash = await bcrypt.hash(password, 10)

  const user = await prisma.usuario.upsert({
    where: { email },
    update: {},
    create: { email, senhaHash: hash, role: 'ADMIN' }, // ajuste os campos conforme seu schema
  })
  console.log('Admin criado ->', user.email, 'senha:', password)
}
main().finally(()=>prisma.$disconnect())
