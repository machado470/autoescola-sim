import { Controller, Get, Param } from "@nestjs/common";
import { LessonsService } from "./lessons.service";

@Controller("categories/:categoryId/phases/:phaseId/lessons")
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Get()
  async list(
    @Param("categoryId") categoryId: string,
    @Param("phaseId") phaseId: string
  ) {
    return this.lessonsService.getLessonsByPhase(categoryId, phaseId);
  }
}
