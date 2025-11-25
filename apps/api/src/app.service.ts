import { Injectable } from '@nestjs/common'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export type HealthResponse = {
  status: 'ok'
  api: string
  version: string
}

@Injectable()
export class AppService {
  private readonly version: string

  constructor() {
    const packageJsonPath = resolve(__dirname, '..', 'package.json')
    try {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
      this.version = packageJson.version ?? '0.0.0'
    } catch (error) {
      this.version = '0.0.0'
    }
  }

  getHealth(): HealthResponse {
    return {
      status: 'ok',
      api: 'autoescola-sim',
      version: this.version,
    }
  }

  getVersion() {
    return this.version
  }
}
