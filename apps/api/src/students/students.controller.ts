import { Controller, Get, Req, UseGuards, Param } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("students")
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(private service: StudentsService) {}

  // =============================
  // /students/me  → dados básicos
  // =============================
  @Get("me")
  async getMe(@Req() req) {
    return this.service.getStudent(req.user.sub);
  }

  // =========================================
  // /students/me/dashboard  → todas as fases
  // =========================================
  @Get("me/dashboard")
  async getDashboard(@Req() req) {
    return this.service.getDashboard(req.user.sub);
  }

  // ==================================================
  // /students/me/fase/:id  → detalhes da fase específica
  // ==================================================
  @Get("me/fase/:id")
  async getFase(@Req() req, @Param("id") id: string) {
    return this.service.getFaseAluno(req.user.sub, id);
  }
}
