import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { QuestionsModule } from './questions/questions.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [PrismaModule, QuestionsModule, HealthModule],
})
export class AppModule {}
