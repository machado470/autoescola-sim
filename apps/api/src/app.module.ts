import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';

import { CategoriesModule } from './categories/categories.module';
import { QuestionsModule } from './questions/questions.module';
import { LessonsModule } from './lessons/lessons.module';
import { PhasesModule } from './phases/phases.module';
import { QuizModule } from './quiz/quiz.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

import { StatsModule } from './stats/stats.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,

    // Domínio principal
    CategoriesModule,
    QuestionsModule,
    LessonsModule,
    PhasesModule,
    QuizModule,
    UsersModule,
    AuthModule,

    // Módulos extras
    StatsModule,
    ProgressModule,
    HealthModule,
  ],
})
export class AppModule {}
