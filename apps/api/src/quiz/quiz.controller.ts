import { Controller, Post, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private service: QuizService) {}

  @Post('start')
  start(@Body() body: { userId: string; categoryId: string; total: number }) {
    return this.service.start(body.userId, body.categoryId, body.total);
  }

  @Post('finish/:id')
  finish(
    @Param('id') id: string,
    @Body() body: { correct: number; wrong: number },
  ) {
    return this.service.finish(id, body);
  }
}
