import {
  Controller,
  Get,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly service: LessonsService) {}

  @Get()
  findByPhase(@Query('phaseId') phaseId: string) {
    return this.service.findByPhase(phaseId);
  }

  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateLessonDto) {
    return this.service.create(dto);
  }
}
