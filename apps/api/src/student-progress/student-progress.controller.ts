import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { StudentProgressService } from './student-progress.service';

@Controller('student-progress')
export class StudentProgressController {
  constructor(private service: StudentProgressService) {}

  @Get('dashboard/:userId')
  getDashboard(@Param('userId') userId: string) {
    return this.service.getUserDashboard(userId);
  }

  @Get(':userId/:phaseId')
  get(@Param('userId') userId: string, @Param('phaseId') phaseId: string) {
    return this.service.getPhaseProgress(userId, phaseId);
  }

  @Post('start')
  start(@Body() body: any) {
    return this.service.startPhase(body.userId, body.phaseId);
  }

  @Post('complete-lesson')
  completeLesson(@Body() body: any) {
    return this.service.completeLesson(body.userId, body.phaseId);
  }

  @Post('answer')
  answer(@Body() body: any) {
    return this.service.registerAnswer(body.userId, body.phaseId, body.correct);
  }

  @Post('finish-phase')
  finish(@Body() body: any) {
    return this.service.finishPhase(body.userId, body.phaseId);
  }
}
