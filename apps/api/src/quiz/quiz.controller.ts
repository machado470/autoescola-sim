import { Controller, Get } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly service: QuizService) {}

  @Get('random')
  random() {
    return this.service.random(10);
  }
}
