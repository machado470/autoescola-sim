import { Controller, Get, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { RandomQueryDto } from './dto/random-query.dto';
import { Difficulty } from '@prisma/client';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly service: QuestionsService) {}

  @Get('random')
  async random(@Query() query: RandomQueryDto) {
    const limit = query.limit ?? 10;
    const difficulty = query.difficulty?.toUpperCase() as Difficulty | undefined;

    return this.service.getRandom({
      limit,
      difficulty,
      excludeIds: query.excludeIds,
      includeAnswers: query.includeAnswers,
    });
  }
}
