import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthDisabled } from './public.decorator'
import { AuthService } from './auth.service'
import { ToggleAccessDto } from './dto/toggle-access.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthDisabled()
  @Post('toggle')
  toggleAccess(@Body() dto: ToggleAccessDto) {
    return this.authService.toggleAccess(dto.enabled)
  }
}
