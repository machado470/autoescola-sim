
import { Controller, Post, Body, Req } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { StartQuizDto } from "./dto/start-quiz.dto";
import { SubmitQuizDto } from "./dto/submit-quiz.dto";

@Controller("quiz")
export class QuizController {
  constructor(private quiz: QuizService) {}

  @Post("start")
  start(@Req() req, @Body() dto: StartQuizDto) {
    const userId = req.user.sub;
    return this.quiz.startQuiz(userId, dto.phaseId);
  }

  @Post("finish")
  finish(@Req() req, @Body() dto: SubmitQuizDto) {
    const userId = req.user.sub;
    return this.quiz.finishQuiz(userId, dto.quizId, dto.answers);
  }
}
