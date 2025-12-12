import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { PhasesModule } from './phases/phases.module';
import { LessonsModule } from './lessons/lessons.module';
import { QuestionsModule } from './questions/questions.module';
import { StudentsModule } from './students/students.module';
import { SimulationsModule } from './simulations/simulations.module';
import { HealthModule } from './health/health.module';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    AuthModule,
    CategoriesModule,
    PhasesModule,
    LessonsModule,
    QuestionsModule,
    StudentsModule,
    SimulationsModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // 🔐 primeiro autentica
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,   // 🧱 depois valida role
    },
  ],
})
export class AppModule {}
