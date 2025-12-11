import { Module } from '@nestjs/common';

// CORE
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

// DOMÍNIOS
import { CategoriesModule } from './categories/categories.module';
import { PhasesModule } from './phases/phases.module';
import { LessonsModule } from './lessons/lessons.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';

// ALUNO
import { StudentsModule } from './students/students.module';

// ADMIN
import { AdminModule } from './admin/admin.module';

// HEALTHCHECK
import { HealthModule } from './health/health.module';

// SIMULATIONS (NOVO)
import { SimulationsModule } from './simulations/simulations.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,

    // Domínios
    CategoriesModule,
    PhasesModule,
    LessonsModule,
    QuestionsModule,
    UsersModule,

    // Aluno
    StudentsModule,

    // Admin
    AdminModule,

    // Simulados (NOVO)
    SimulationsModule,

    // Health
    HealthModule,
  ],
})
export class AppModule {}
