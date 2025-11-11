import { AuthGuard } from "@nestjs/passport";
import { UseGuards } from "@nestjs/common";
import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
@UseGuards(AuthGuard('jwt'))
@UseGuards(AuthGuard('jwt'))
export class QuizController {
  constructor(private readonly quiz: QuizService) {}

  @Get('random')
  random(@Query('limit') limit?: string) {
    const n = Math.max(1, Math.min(parseInt(limit ?? '10', 10) || 10, 50));
    return this.quiz.random(n);
  }

  @Get('random-by-category')
  randomByCategory(
    @Query('categoryId', ParseIntPipe) categoryId: number,
    @Query('limit') limit?: string,
  ) {
    const n = Math.max(1, Math.min(parseInt(limit ?? '10', 10) || 10, 50));
    return this.quiz.randomByCategory(categoryId, n);
  }
}
