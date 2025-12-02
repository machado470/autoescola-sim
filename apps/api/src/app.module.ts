import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';

import { CategoriesModule } from './categories/categories.module';
import { QuestionsModule } from './questions/questions.module';
import { LessonsModule } from './lessons/lessons.module';
import { PhasesModule } from './phases/phases.module';
import { QuizModule } from './quiz/quiz.module';
import { StudentProgressModule } from './student-progress/student-progress.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,

    // módulos do domínio
    CategoriesModule,
    QuestionsModule,
    LessonsModule,
    PhasesModule,
    QuizModule,
    StudentProgressModule,
    UsersModule,
    AuthModule,

    // health check
    HealthModule,
  ],
})
export class AppModule {}
