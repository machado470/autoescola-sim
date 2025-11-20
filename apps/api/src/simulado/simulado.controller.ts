import { Controller, Post, Body, Get, Req } from "@nestjs/common";
import { SimuladoService } from "./simulado.service";

@Controller("simulado")
export class SimuladoController {
  constructor(private readonly service: SimuladoService) {}

  @Post("start")
  start(@Req() req) {
    return this.service.start(req.user.id);
  }

  @Post("finish")
  finish(@Req() req, @Body() body) {
    return this.service.finish(req.user.id, body);
  }

  @Get("history")
  history(@Req() req) {
    return this.service.history(req.user.id);
  }
}
