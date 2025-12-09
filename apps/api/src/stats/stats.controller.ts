import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { StatsService } from "./stats.service";

// caminho correto → apenas um nível acima
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("stats")
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get("student")
  async getStats(@Req() req) {
    return this.statsService.getStudentStats(req.user.sub);
  }
}
