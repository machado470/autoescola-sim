import {
  Controller,
  Get,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly service: QuestionsService) {}

  @Get()
  findByPhase(@Query('phaseId') phaseId: string) {
    return this.service.findByPhase(phaseId);
  }

  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateQuestionDto) {
    return this.service.create(dto);
  }
}
