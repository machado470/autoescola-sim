import { Module } from '@nestjs/common'
import { SimuladosController } from './simulados.controller'
import { SimuladosService } from './simulados.service'

@Module({
  controllers: [SimuladosController],
  providers: [SimuladosService],
})
export class SimuladosModule {}
