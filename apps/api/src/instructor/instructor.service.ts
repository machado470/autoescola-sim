import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstructorDto, UpdateInstructorDto } from './dto/instructor.dto';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.instructor.findMany({ include: { school: true } });
  }

  async findOne(id: string) {
    const data = await this.prisma.instructor.findUnique({
      where: { id },
      include: { school: true },
    });
    if (!data) throw new NotFoundException('Instructor not found');
    return data;
  }

  create(data: CreateInstructorDto) {
    return this.prisma.instructor.create({ data });
  }

  update(id: string, data: UpdateInstructorDto) {
    return this.prisma.instructor.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.instructor.delete({ where: { id } });
  }
}
