import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.lesson.create({
      data,
    });
  }

  findAll() {
    return this.prisma.lesson.findMany();
  }

  findOne(id: string) {
    return this.prisma.lesson.findUnique({
      where: { id },
    });
  }

  update(id: string, data: any) {
    return this.prisma.lesson.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.lesson.delete({
      where: { id },
    });
  }
}
