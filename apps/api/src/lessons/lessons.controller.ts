import { Controller, Get, Param } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(Number(id));
  }

  @Get('/phase/:phaseId')
  findByPhase(@Param('phaseId') phaseId: string) {
    return this.lessonsService.findByPhase(Number(phaseId));
  }

  @Get('/category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.lessonsService.findByCategory(Number(categoryId));
  }
}
