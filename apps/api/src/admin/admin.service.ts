import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const totalStudents = await this.prisma.user.count({
      where: { role: "STUDENT" },
    });

    const totalQuestions = await this.prisma.question.count();

    const totalSimulados = await this.prisma.phase.count();

    return {
      totalStudents,
      totalQuestions,
      totalSimulados,
    };
  }
}
