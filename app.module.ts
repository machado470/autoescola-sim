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

// SIMULADO (NOVO)
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,

    // Domínios AutoEscola
    CategoriesModule,
    PhasesModule,
    LessonsModule,
    QuestionsModule,
    ProgressModule,
    StatsModule,
    UsersModule,

    // Fluxo do aluno
    StudentsModule,

    // Simulado
    QuizModule,
  ],
})
export class AppModule {}
