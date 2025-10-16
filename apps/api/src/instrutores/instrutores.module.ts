import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { InstrutoresController } from './instrutores.controller'
import { InstrutoresService } from './instrutores.service'

@Module({
  imports: [PrismaModule],
  controllers: [InstrutoresController],
  providers: [InstrutoresService],
  exports: [InstrutoresService],
})
export class InstrutoresModule {}
