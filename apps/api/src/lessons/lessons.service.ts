import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.lesson.findMany({
      include: { phase: true, category: true },
    });
  }
}
