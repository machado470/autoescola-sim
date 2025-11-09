import { AuthModule } from './auth/auth.module';

import { AlunosModule } from './alunos/alunos.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health/health.controller';
import { SchoolModule } from './school/school.module';
import { InstructorModule } from './instructor/instructor.module';
import { SimulatorModule } from './simulator/simulator.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [ AuthModule,  QuizModule, SimulatorModule, PrismaModule, SchoolModule, InstructorModule ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
