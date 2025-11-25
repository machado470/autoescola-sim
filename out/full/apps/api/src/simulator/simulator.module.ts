import { Module } from '@nestjs/common';
import { SimulatorService } from './simulator.service';
import { SimulatorController } from './simulator.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SimulatorController],
  providers: [SimulatorService, PrismaService],
})
export class SimulatorModule {}
