import { Controller, Post, Body, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { QuizService } from "./quiz.service";
import { StartQuizDto } from "./dto/start-quiz.dto";
import { SubmitQuizDto } from "./dto/submit-quiz.dto";

@Controller("quiz")
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(private quiz: QuizService) {}

  @Post("start")
  start(@Req() req, @Body() dto: StartQuizDto) {
    return this.quiz.startQuiz(req.user.sub, dto.phaseId);
  }

  @Post("finish")
  finish(@Req() req, @Body() dto: SubmitQuizDto) {
    return this.quiz.finishQuiz(req.user.sub, dto.quizId, dto.answers);
  }
}
