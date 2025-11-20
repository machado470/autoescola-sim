import { Module } from "@nestjs/common";
import { PhasesService } from "./phases.service";
import { PhasesController } from "./phases.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [PhasesController],
  providers: [PhasesService, PrismaService],
})
export class PhasesModule {}
