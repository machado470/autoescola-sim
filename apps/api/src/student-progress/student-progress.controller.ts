import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { StudentProgressService } from './student-progress.service';

@Controller('student-progress')
export class StudentProgressController {
  constructor(private readonly progressService: StudentProgressService) {}

  // Buscar progresso geral do aluno na categoria
  @Get(':userId/:categoryId')
  getProgress(
    @Param('userId') userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.progressService.getProgress(userId, categoryId);
  }

  // Registrar resultado de uma questão
  @Post('register')
  registerResult(
    @Body()
    body: {
      userId: string;
      categoryId: string;
      isCorrect: boolean;
    },
  ) {
    return this.progressService.registerResult(
      body.userId,
      body.categoryId,
      body.isCorrect,
    );
  }
}
