import { Controller, Get } from "@nestjs/common";
import { StatsService } from "./stats.service";

@Controller("stats")
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get("student")
  async getStats() {
    const studentId = "1"; // ⚠️ Temporário — depois vamos pegar do JWT
    return this.statsService.getStudentStats(studentId);
  }
}
