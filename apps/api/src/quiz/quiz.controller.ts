import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { StartQuizDto } from './dto/start-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('start')
  @UseGuards(JwtAuthGuard)
  start(@CurrentUser() user, @Body() dto: StartQuizDto) {
    return this.quizService.startQuiz(user.id, dto);
  }

  @Post('finish')
  @UseGuards(JwtAuthGuard)
  finish(@CurrentUser() user, @Body() dto: SubmitQuizDto) {
    return this.quizService.finishQuiz(user.id, dto);
  }
}
