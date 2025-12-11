import { Controller, Post, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { StudentsLessonsService } from './student-lessons.service';

@Controller('students/me/lessons')
export class StudentLessonsController {
  constructor(private readonly service: StudentsLessonsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':lessonId/complete')
  async completeLesson(@Req() req, @Param('lessonId') lessonId: string) {
    const userId = req.user.sub;
    return this.service.completeLesson(userId, lessonId);
  }
}
