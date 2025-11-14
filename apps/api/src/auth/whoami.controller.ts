import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class WhoAmIController {
  @UseGuards(JwtAuthGuard)
  @Get("whoami")
  whoAmI(@Req() req: any) {
    return req.user;
  }
}
