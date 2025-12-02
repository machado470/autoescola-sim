import { Module } from '@nestjs/common';
import { StudentProgressService } from './student-progress.service';
import { StudentProgressController } from './student-progress.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [StudentProgressController],
  providers: [StudentProgressService, PrismaService],
})
export class StudentProgressModule {}
