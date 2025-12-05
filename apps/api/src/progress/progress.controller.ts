import { Controller, Post, Body, Req, Get, Param, UseGuards } from "@nestjs/common";
import { ProgressService } from "./progress.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("progress")
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private service: ProgressService) {}

  @Post("lesson")
  completeLesson(@Req() req, @Body() body: { phaseId: string }) {
    return this.service.completeLesson(req.user.sub, body.phaseId);
  }

  @Post("answer")
  answer(@Req() req, @Body() body: { phaseId: string; isCorrect: boolean }) {
    return this.service.answerQuestion(
      req.user.sub,
      body.phaseId,
      body.isCorrect
    );
  }

  @Post("finish")
  finishPhase(@Req() req, @Body() body: { phaseId: string }) {
    return this.service.finishPhase(req.user.sub, body.phaseId);
  }

  @Get("phase/:phaseId")
  getPhase(@Req() req, @Param("phaseId") phaseId: string) {
    return this.service.getPhaseProgress(req.user.sub, phaseId);
  }
}
