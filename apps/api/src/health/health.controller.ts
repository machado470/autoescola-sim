import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    // Simples resposta de status sem depender do banco
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
