import { Controller, Get, Param } from '@nestjs/common';
import { StudentProgressService } from './student-progress.service';

@Controller('progress')
export class StudentProgressController {
  constructor(private service: StudentProgressService) {}

  @Get(':userId')
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }
}
