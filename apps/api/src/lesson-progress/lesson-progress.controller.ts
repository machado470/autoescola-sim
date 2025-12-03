import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { LessonProgressService } from './lesson-progress.service';
import { StartLessonDto } from './dto/start-lesson.dto';
import { FinishLessonDto } from './dto/finish-lesson.dto';

@Controller('lesson-progress')
export class LessonProgressController {
  constructor(private readonly service: LessonProgressService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post('start')
  startLesson(@Body() dto: StartLessonDto) {
    return this.service.startLesson(dto);
  }

  @Patch(':id/finish')
  finishLesson(@Param('id') id: string, @Body() dto: FinishLessonDto) {
    return this.service.finishLesson(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
