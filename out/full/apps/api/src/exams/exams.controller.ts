import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExamsService } from './exams.service';

@Controller('api/exams')
export class ExamsController {
  constructor(private readonly service: ExamsService) {}

  @Post('session/start')
  start() {
    return this.service.startSession();
  }

  @Post('session/:id/answer')
  answer(
    @Param('id') id: string,
    @Body() body: { questionId: string; choiceId: string },
  ) {
    return this.service.submitAnswer(id, body);
  }

  @Get('session/:id/current')
  current(@Param('id') id: string) {
    return this.service.getCurrent(id);
  }
}
