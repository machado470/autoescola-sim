import { AlunosModule } from './alunos/alunos.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health/health.controller';
import { SchoolModule } from './school/school.module';
import { InstructorModule } from './instructor/instructor.module';
import { SimulatorModule } from './simulator/simulator.module';

@Module({
  imports: [
    PrismaModule,
    SchoolModule,
    InstructorModule,
    SimulatorModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
