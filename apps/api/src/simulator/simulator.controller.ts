import { Controller, Get } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("simulator")
export class SimulatorController {
  @Get()
  findAll() {
    // pode trocar pela lógica real; isso é só para compilar/rodar
    return { message: "simulator ok" };
  }
}
