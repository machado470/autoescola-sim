import { Module } from '@nestjs/common';
import { SimulationsController } from './simulations.controller';
import { SimulationsService } from './simulations.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SimulationsController],
  providers: [SimulationsService, PrismaService],
})
export class SimulationsModule {}
