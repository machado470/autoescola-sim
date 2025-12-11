import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Request } from 'express';

@Controller('simulations')
@UseGuards(JwtAuthGuard)
export class SimulationsController {
  constructor(private readonly simulations: SimulationsService) {}

  @Post('start')
  async start(@Req() req: Request) {
    const user = req.user as any;
    const attempt = await this.simulations.startSimulation(user.sub);

    return {
      message: 'Simulado iniciado',
      attemptId: attempt.id,
    };
  }

  @Post('finish')
  async finish(
    @Req() req: Request,
    @Body('percentage') percentage: number,
  ) {
    const user = req.user as any;
    const attempt = await this.simulations.finishSimulation(user.sub, percentage);

    return {
      message: 'Simulado finalizado',
      attempt,
    };
  }

  @Get('history')
  async history(@Req() req: Request) {
    const user = req.user as any;
    return this.simulations.getHistory(user.sub);
  }
}
