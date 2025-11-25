import { Controller, Get } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { StatsResponse, StatsService } from './stats.service'

@ApiTags('Stats')
@ApiBearerAuth()
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  getStats(): Promise<StatsResponse> {
    return this.statsService.getStats()
  }
}
