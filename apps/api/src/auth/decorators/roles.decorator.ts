import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: ('ADMIN' | 'STUDENT')[]) =>
  SetMetadata('roles', roles);
