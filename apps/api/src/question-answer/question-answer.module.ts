import { Module } from '@nestjs/common';
import { QuestionAnswerService } from './question-answer.service';
import { QuestionAnswerController } from './question-answer.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [QuestionAnswerController],
  providers: [QuestionAnswerService, PrismaService],
})
export class QuestionAnswerModule {}
