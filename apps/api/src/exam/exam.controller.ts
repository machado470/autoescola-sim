import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ExamService } from './exam.service';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  // Retorna um simulado completo de uma categoria
  @Get('category/:categoryId')
  async getExamByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.examService.getExamByCategory(categoryId);
  }

  // Retorna uma fase específica da categoria
  @Get('phase/:phaseId')
  async getExamByPhase(@Param('phaseId', ParseIntPipe) phaseId: number) {
    return this.examService.getExamByPhase(phaseId);
  }
}
