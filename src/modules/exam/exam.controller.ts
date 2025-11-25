import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ExamService } from './exam.service'
import { StartExamDto } from './dto/start-exam.dto'
import { SubmitAnswerDto } from './dto/submit-answer.dto'
import { FinishExamDto } from './dto/finish-exam.dto'

@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('exam')
export class ExamController {
  constructor(private readonly service: ExamService) {}

  @Post('start')
  start(@Body() dto: StartExamDto) {
    return this.service.start(dto.metadata)
  }

  @Post('answer')
  answer(@Body() dto: SubmitAnswerDto) {
    return this.service.answer(dto.examSessionId, dto.questionId, dto.choiceId)
  }

  @Post('finish')
  finish(@Body() dto: FinishExamDto) {
    return this.service.finish(dto.examSessionId)
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.getById(id)
  }
}
