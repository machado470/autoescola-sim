import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AUTH_ENABLED_KEY } from './public.decorator'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isEnabledMetadata = this.reflector.getAllAndOverride<boolean | undefined>(
      AUTH_ENABLED_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (isEnabledMetadata === false) {
      return true
    }

    if (this.authService.isEnabled()) {
      return true
    }

    throw new ForbiddenException('Access to this route is currently disabled')
  }
}
