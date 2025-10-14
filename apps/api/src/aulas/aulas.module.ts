import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { AulasController } from './aulas.controller'
import { AulasService } from './aulas.service'

@Module({
  imports: [PrismaModule],
  controllers: [AulasController],
  providers: [AulasService],
})
export class AulasModule {}
