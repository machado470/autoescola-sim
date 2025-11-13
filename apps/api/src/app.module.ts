import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { QuizModule } from './quiz/quiz.module';
import { SimulatorModule } from './simulator/simulator.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, AuthModule, QuizModule, SimulatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
