import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();
  constructor(private readonly jwt: JwtService) {}
  async validateUser(email: string, plain: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException("Credenciais inválidas");
    const ok = await bcrypt.compare(plain, (user as any).password);
    if (!ok) throw new UnauthorizedException("Credenciais inválidas");
    const { password, ...safe } = user as any;
    return safe;
  }
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email, role: (user as any).role ?? "USER" };
    return { access_token: this.jwt.sign(payload) };
  }
}
