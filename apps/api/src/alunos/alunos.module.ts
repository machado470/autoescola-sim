import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { AlunosService } from './alunos.service'
import { AlunosController } from './alunos.controller'

@Module({
  imports: [PrismaModule],
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosModule {}
