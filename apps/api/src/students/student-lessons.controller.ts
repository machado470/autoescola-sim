import {
  Controller,
  Post,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StudentsLessonsService } from './student-lessons.service';

@Controller('students/me/lessons')
export class StudentLessonsController {
  constructor(
    private readonly service: StudentsLessonsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':lessonId/complete')
  async completeLesson(
    @Req() req: any,
    @Param('lessonId') lessonId: string,
  ) {
    // ✅ CORRETO: o JWT expõe "sub"
    const userId = req.user.sub;
    return this.service.completeLesson(userId, lessonId);
  }
}
