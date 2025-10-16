import { SetMetadata } from '@nestjs/common'

export const AUTH_ENABLED_KEY = 'auth:enabled'

export const AuthEnabled = () => SetMetadata(AUTH_ENABLED_KEY, true)
export const AuthDisabled = () => SetMetadata(AUTH_ENABLED_KEY, false)

// Backwards compatibility helper for routes that should bypass the auth guard
export const Public = AuthDisabled
