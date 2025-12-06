import { Controller, Get } from '@nestjs/common';
import { PhasesService } from './phases.service';

@Controller('phases')
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}

  @Get()
  findAll() {
    return this.phasesService.findAll();
  }
}
