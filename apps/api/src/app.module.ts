import { Module } from '@nestjs/common';

// CORE
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

// DOMÍNIOS
import { CategoriesModule } from './categories/categories.module';
import { PhasesModule } from './phases/phases.module';
import { LessonsModule } from './lessons/lessons.module';
import { QuestionsModule } from './questions/questions.module';
import { ProgressModule } from './progress/progress.module';
import { StatsModule } from './stats/stats.module';
import { UsersModule } from './users/users.module';

// ALUNO
import { StudentsModule } from './students/students.module';

// ADMIN (NOVO)
import { AdminModule } from './admin/admin.module';

// HEALTHCHECK
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,

    // Domínios da AutoEscola
    CategoriesModule,
    PhasesModule,
    LessonsModule,
    QuestionsModule,
    ProgressModule,
    StatsModule,
    UsersModule,

    // Módulo do aluno
    StudentsModule,

    // Módulo administrativo (agora funcionando)
    AdminModule,

    // Healthcheck — evita container travar como unhealthy
    HealthModule,
  ],
})
export class AppModule {}
