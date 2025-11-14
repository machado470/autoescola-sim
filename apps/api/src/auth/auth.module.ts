import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { WhoAmIController } from "./whoami.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: "secret123",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController, WhoAmIController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
