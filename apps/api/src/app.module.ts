import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { resolve } from 'node:path'
import { AlunosModule } from './alunos/alunos.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InstrutoresModule } from './instrutores/instrutores.module'
import { PrismaModule } from './prisma/prisma.module'
import { SimuladosModule } from './simulados/simulados.module'

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
    AlunosModule,
    InstrutoresModule,
    SimuladosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
