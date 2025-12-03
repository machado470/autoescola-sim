import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  //
  // LOGIN
  //
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    return this.generateTokens(user);
  }

  //
  // REGISTRO
  //
  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        role: 'STUDENT',
      },
    });

    return this.generateTokens(user);
  }

  //
  // GERA ACCESS + REFRESH
  //
  async generateTokens(user: any) {
    const payload = {
      sub: String(user.id), // corrigido
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwt.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN as any, // corrigido
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as any, // corrigido
    });

    // salva hash do refresh
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        refreshTokenHash: await bcrypt.hash(refreshToken, 10),
      },
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  //
  // VALIDA REFRESH TOKEN
  //
  async validateRefreshToken(userId: string, incomingToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.refreshTokenHash) return null;

    const isValid = await bcrypt.compare(incomingToken, user.refreshTokenHash);
    return isValid ? user : null;
  }

  //
  // REFRESH
  //
  async refresh(user: any) {
    return this.generateTokens(user);
  }

  //
  // LOGOUT
  //
  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: null },
    });

    return { success: true };
  }
}
