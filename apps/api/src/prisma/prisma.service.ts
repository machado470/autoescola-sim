import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name)
  private readonly skipConnection: boolean

  constructor() {
    super()

    const hasDatabaseUrl = Boolean(process.env.DATABASE_URL)
    const prismaSkipConnect =
      process.env.PRISMA_SKIP_CONNECT?.toLowerCase() === 'true'

    this.skipConnection = prismaSkipConnect || !hasDatabaseUrl

    if (!hasDatabaseUrl) {
      this.logger.warn(
        'DATABASE_URL is not defined. Prisma connection will be skipped.',
      )
    } else if (prismaSkipConnect) {
      this.logger.warn(
        'PRISMA_SKIP_CONNECT=true detected. Prisma connection will be skipped.',
      )
    }
  }

  async onModuleInit() {
    if (this.skipConnection) {
      return
    }

    await this.$connect()
  }

  async onModuleDestroy() {
    if (this.skipConnection) {
      return
    }

    await this.$disconnect()
  }
}
