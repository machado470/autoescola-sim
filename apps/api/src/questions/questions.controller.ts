import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private service: QuestionsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get('random')
  random(
    @Query('categoryId') categoryId: string,
    @Query('take') take = 10,
  ) {
    return this.service.random(categoryId, Number(take));
  }
}
