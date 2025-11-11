import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

class LoginDto { email!: string; password!: string; }

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post("login")
  async login(@Body() body: LoginDto) {
    return this.auth.login(body.email, body.password);
  }
}
