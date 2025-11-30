import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return { status: 'API rodando!' };
  }

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }
}
