import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class WhoamiController {
  @UseGuards(AuthGuard('jwt'))
  @Get('whoami')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
