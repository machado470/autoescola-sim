import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot() {
    return {
      message: 'AutoEscola API is running',
    }
  }

  @Get('env')
  getEnvironment() {
    return this.appService.getEnvironmentSummary()
  }
}
