import { Module } from '@nestjs/common';

// CORE
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

// DOMÍNIOS
import { CategoriesModule } from './categories/categories.module';
import { PhasesModule } from './phases/phases.module';
import { LessonsModule } from './lessons/lessons.module';
import { QuestionsModule } from './questions/questions.module';
import { QuizModule } from './quiz/quiz.module';
import { ProgressModule } from './progress/progress.module';
import { StatsModule } from './stats/stats.module';
import { UsersModule } from './users/users.module';

// ALUNO (NOVO)
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,

    // Domínios da AutoEscola
    CategoriesModule,
    PhasesModule,
    LessonsModule,
    QuestionsModule,
    QuizModule,
    ProgressModule,
    StatsModule,
    UsersModule,

    // 🔥 REGISTRA O MÓDULO DO ALUNO
    StudentsModule,
  ],
})
export class AppModule {}
