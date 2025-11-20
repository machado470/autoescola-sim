import { Module } from "@nestjs/common";
import { SimuladoService } from "./simulado.service";
import { SimuladoController } from "./simulado.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [SimuladoController],
  providers: [SimuladoService, PrismaService],
})
export class SimuladoModule {}
