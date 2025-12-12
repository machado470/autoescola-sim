import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { StartSimulationDto } from './dto/start-simulation.dto';
import { AnswerDto } from './dto/answer.dto';
import { FinishDto } from './dto/finish.dto';

@Controller('simulations')
export class SimulationsController {
  constructor(private service: SimulationsService) {}

  @Post('start')
  start(@Req() req, @Body() dto: StartSimulationDto) {
    return this.service.startSimulation(req.user.sub, dto.phaseId);
  }

  @Post('answer')
  answer(@Body() dto: AnswerDto) {
    return this.service.recordAnswer(dto);
  }

  @Post('finish')
  finish(@Req() req, @Body() dto: FinishDto) {
    return this.service.finishSimulation(dto.simulationId, req.user.sub);
  }

  @Get('me')
  myResults(@Req() req) {
    return this.service.getMySimulations(req.user.sub);
  }

  // 🔥 NOVO ENDPOINT — RANKING GLOBAL
  @Get('ranking')
  ranking() {
    return this.service.getRanking();
  }
}
