import { Controller, Post, Body } from "@nestjs/common";
import { ProgressService } from "./progress.service";

@Controller("progress")
export class ProgressController {
  constructor(private service: ProgressService) {}

  // POST /progress/lesson
  @Post("lesson")
  completeLesson(
    @Body() body: { userId: string; phaseId: string }
  ) {
    return this.service.completeLesson(body.userId, body.phaseId);
  }

  // POST /progress/answer
  @Post("answer")
  answerQuestion(
    @Body() body: { userId: string; phaseId: string; isCorrect: boolean }
  ) {
    return this.service.answerQuestion(
      body.userId,
      body.phaseId,
      body.isCorrect,
    );
  }

  // POST /progress/finish
  @Post("finish")
  finishPhase(
    @Body() body: { userId: string; phaseId: string }
  ) {
    return this.service.finishPhase(body.userId, body.phaseId);
  }
}
