import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me/dashboard')
  async getDashboard(@Req() req) {
    const userId = req.user.sub;
    return this.studentsService.getDashboard(userId);
  }
}
