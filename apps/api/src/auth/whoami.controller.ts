import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class WhoamiController {
  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  whoami(@Request() req: any) {
    return req.user;
  }
}
