import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PhaseProgressService } from './phase-progress.service';
import { StartPhaseDto } from './dto/start-phase.dto';
import { UpdatePhaseProgressDto } from './dto/update-progress.dto';

@Controller('phase-progress')
export class PhaseProgressController {
  constructor(private readonly service: PhaseProgressService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post('start')
  startPhase(@Body() dto: StartPhaseDto) {
    return this.service.startPhase(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePhaseProgressDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
