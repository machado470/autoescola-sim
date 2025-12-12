import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me/dashboard')
  async getDashboard(@Req() req) {
    return this.studentsService.getProfile(req.user.userId);
  }
}
