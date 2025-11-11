import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class WhoAmIController {
  @UseGuards(AuthGuard("jwt"))
  @Get("whoami")
  me(@Request() req: any) {
    return req.user;
  }
}
