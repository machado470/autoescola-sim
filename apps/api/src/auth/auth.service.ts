import { Injectable } from '@nestjs/common'

export interface AuthState {
  enabled: boolean
}

@Injectable()
export class AuthService {
  private state: AuthState = { enabled: true }

  getState(): AuthState {
    return { ...this.state }
  }

  isEnabled(): boolean {
    return this.state.enabled
  }

  toggleAccess(enabled: boolean): AuthState {
    this.state = { enabled }
    return this.getState()
  }
}
