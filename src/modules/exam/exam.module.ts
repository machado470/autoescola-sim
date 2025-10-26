import { Module } from '@nestjs/common'
import { ExamController } from './exam.controller'
import { ExamService } from './exam.service'
import { PrismaService } from '@/common/prisma.service'

@Module({
  controllers: [ExamController],
  providers: [ExamService, PrismaService],
  exports: [ExamService],
})
export class ExamModule {}
