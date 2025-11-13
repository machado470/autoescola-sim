import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Modo DEV: libera todas as requisições que usam esse guard.
    // Depois a gente volta e valida o JWT de verdade.
    return true;
  }
}
