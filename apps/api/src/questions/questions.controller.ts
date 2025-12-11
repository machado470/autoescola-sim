import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('questions')
export class QuestionsController {
  constructor(private service: QuestionsService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get('phase/:phaseId')
  getByPhase(@Param('phaseId') phaseId: string) {
    return this.service.getByPhase(phaseId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateQuestionDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
