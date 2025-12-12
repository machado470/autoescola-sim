import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { PhasesService } from './phases.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('phases')
export class PhasesController {
  constructor(private readonly service: PhasesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreatePhaseDto) {
    return this.service.create(dto);
  }
}
