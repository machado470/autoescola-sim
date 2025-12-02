import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentProgressService {
  constructor(private prisma: PrismaService) {}

  findByUser(userId: string) {
    return this.prisma.studentProgress.findMany({
      where: { userId },
    });
  }
}
