import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { ProgressService } from "./progress.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("progress")
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private service: ProgressService) {}

  @Get("student")
  async getStudentProgress(@Req() req) {
    return this.service.getStudentProgress(req.user.sub);
  }

  @Get(":phaseId")
  async getProgressByPhase(@Req() req, @Param("phaseId") phaseId: string) {
    return this.service.getProgressByPhase(req.user.sub, phaseId);
  }
}
