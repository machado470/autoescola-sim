import { Injectable } from '@nestjs/common'

export type EnvironmentSummary = {
  port: number
  databaseUrl: string | null
  webApiUrl: string | null
}

@Injectable()
export class AppService {
  getEnvironmentSummary(): EnvironmentSummary {
    const portValue = process.env.PORT ?? '3333'
    const port = Number(portValue)

    return {
      port,
      databaseUrl: process.env.DATABASE_URL ?? null,
      webApiUrl: process.env.VITE_API_URL ?? null,
    }
  }
}
