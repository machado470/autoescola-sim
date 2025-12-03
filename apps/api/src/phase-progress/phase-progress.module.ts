import { Module } from '@nestjs/common';
import { PhaseProgressService } from './phase-progress.service';
import { PhaseProgressController } from './phase-progress.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PhaseProgressController],
  providers: [PhaseProgressService, PrismaService],
})
export class PhaseProgressModule {}
