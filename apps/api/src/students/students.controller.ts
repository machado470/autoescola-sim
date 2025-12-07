import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // 🔥 NOVA ROTA: /students/me/dashboard
  @Get('me/dashboard')
  getMyDashboard(@Req() req) {
    return this.studentsService.getDashboard(req.user.sub);
  }

  // ROTA EXISTENTE (continua funcionando)
  @Get(':id/dashboard')
  getDashboard(@Param('id') id: string) {
    return this.studentsService.getDashboard(id);
  }

  @Get(':studentId/fase/:phaseId')
  getFaseAluno(
    @Param('studentId') studentId: string,
    @Param('phaseId') phaseId: string,
  ) {
    return this.studentsService.getFaseAluno(studentId, phaseId);
  }

  @Post(':studentId/fase/:phaseId/concluir-aula/:lessonIndex')
  concluirAula(
    @Param('studentId') studentId: string,
    @Param('phaseId') phaseId: string,
    @Param('lessonIndex') lessonIndex: string,
  ) {
    return this.studentsService.concluirAula(
      studentId,
      phaseId,
      Number(lessonIndex),
    );
  }

  @Post(':studentId/fase/:phaseId/responder-questao/:questionIndex')
  responderQuestao(
    @Param('studentId') studentId: string,
    @Param('phaseId') phaseId: string,
    @Param('questionIndex') questionIndex: string,
  ) {
    return this.studentsService.responderQuestao(
      studentId,
      phaseId,
      Number(questionIndex),
    );
  }
}
