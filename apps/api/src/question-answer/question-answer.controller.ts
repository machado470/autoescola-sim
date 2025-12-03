import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { QuestionAnswerService } from './question-answer.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Controller('question-answer')
export class QuestionAnswerController {
  constructor(private readonly service: QuestionAnswerService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post('submit')
  submit(@Body() dto: SubmitAnswerDto) {
    return this.service.submit(dto);
  }

  @Post('finish/:userId/:phaseId')
  finishQuiz(@Param('userId') userId: string, @Param('phaseId') phaseId: string) {
    return this.service.finishQuiz(userId, phaseId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
