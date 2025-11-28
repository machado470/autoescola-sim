import { Controller, Get, Param } from '@nestjs/common';
import { PhaseService } from './phase.service';

@Controller('phases')
export class PhaseController {
  constructor(private service: PhaseService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('category/:id')
  findByCategory(@Param('id') id: string) {
    return this.service.findByCategory(Number(id));
  }
}
