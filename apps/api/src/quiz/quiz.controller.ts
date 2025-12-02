import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('generate/:quantity')
  generate(@Param('quantity') quantity: string) {
    return this.quizService.generateQuiz(Number(quantity));
  }

  @Post('submit')
  submit(@Body() dto: SubmitQuizDto) {
    return this.quizService.submitQuiz(dto);
  }
}
