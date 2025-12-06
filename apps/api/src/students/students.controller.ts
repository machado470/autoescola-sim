import { Controller, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

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

  // 🔥 CONCLUIR AULA
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

  // 🔥 RESPONDER QUESTÃO
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
