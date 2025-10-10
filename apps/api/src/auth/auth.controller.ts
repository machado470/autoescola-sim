import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService, AuthenticatedUser } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Public } from './public.decorator'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: AuthenticatedUser }) {
    return this.authService.login(req.user)
  }
}
