import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstructorDto, UpdateInstructorDto } from './dto/instructor.dto';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService) {}

  findAll() {
  }

  async findOne(id: string) {
    const data = await this.prisma.instrutor.findUnique({
      where: { id },
    });
    if (!data) throw new NotFoundException('Instructor not found');
    return data;
  }

  create(data: CreateInstructorDto) {
    return this.prisma.instrutor.create({ data });
  }

  update(id: string, data: UpdateInstructorDto) {
    return this.prisma.instrutor.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.instrutor.delete({ where: { id } });
  }
}
