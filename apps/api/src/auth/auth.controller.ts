import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  //
  // REGISTER
  //
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  //
  // LOGIN
  //
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  //
  // ME
  //
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }

  //
  // REFRESH
  //
  @UseGuards(RefreshGuard)
  @Get('refresh')
  refresh(@Req() req: any) {
    return this.auth.refresh(req.user);
  }

  //
  // LOGOUT
  //
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: any) {
    return this.auth.logout(req.user.id);
  }
}
