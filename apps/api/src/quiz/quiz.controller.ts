import { Controller, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly service: QuizService) {}

  // /quiz/random
  @Get('random')
  random() {
    return this.service.random(10);
  }

  // /quiz/phase/:id/random
  @Get('phase/:id/random')
  randomByPhase(@Param('id') id: string) {
    return this.service.randomByPhase(Number(id), 10);
  }

  // /quiz/category/:id/random
  @Get('category/:id/random')
  randomByCategory(@Param('id') id: string) {
    return this.service.randomByCategory(Number(id), 10);
  }
}

