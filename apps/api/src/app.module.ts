import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { resolve } from 'node:path'
import { AlunosModule } from './alunos/alunos.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthGuard } from './auth/auth.guard'
import { AuthModule } from './auth/auth.module'
import { InstrutoresModule } from './instrutores/instrutores.module'
import { PrismaModule } from './prisma/prisma.module'
import { SchoolsModule } from './schools/schools.module'
import { SimuladosModule } from './simulados/simulados.module'
import { StatsModule } from './stats/stats.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        resolve(__dirname, '..', '..', '..', '.env'),
        '.env',
      ],
    }),
    PrismaModule,
    AuthModule,
    AlunosModule,
    InstrutoresModule,
    SimuladosModule,
    StatsModule,
    SchoolsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
