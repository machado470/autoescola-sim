import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly service: StatsService) {}

  // Estatísticas gerais do usuário
  @Get('user/:userId')
  getUserStats(@Param('userId') userId: string) {
    return this.service.getUserStats(Number(userId));
  }

  // Estatísticas por categoria
  @Get('category/:categoryId/:userId')
  getCategoryStats(
    @Param('categoryId') categoryId: string,
    @Param('userId') userId: string,
  ) {
    return this.service.getCategoryStats(Number(categoryId), Number(userId));
  }
}

