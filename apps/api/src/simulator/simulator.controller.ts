import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SimulatorService } from './simulator.service';

@Controller('simulator')
export class SimulatorController {
  constructor(private readonly simulatorService: SimulatorService) {}

  @Post()
  create(@Body() body: any) {
    return this.simulatorService.create(body);
  }

  @Get()
  findAll() {
    return this.simulatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simulatorService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.simulatorService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simulatorService.remove(Number(id));
  }
}
