import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';

import { QuestionsModule } from './questions/questions.module';
import { QuizModule } from './quiz/quiz.module';
import { AuthModule } from './auth/auth.module';
import { StatsModule } from './stats/stats.module';
import { ExamModule } from './exam/exam.module';

import { CategoryModule } from './category/category.module';
import { PhaseModule } from './phase/phase.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,

    // Domínio de Questões / Categorias / Fases
    CategoryModule,
    PhaseModule,
    QuestionsModule,

    // Quiz / Estatísticas / Autenticação / Simulado
    QuizModule,
    StatsModule,
    AuthModule,
    ExamModule,
  ],
})
export class AppModule {}

