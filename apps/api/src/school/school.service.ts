import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSchoolDto, UpdateSchoolDto } from './dto/school.dto';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  list() { return this.prisma.school.findMany({ orderBy: { createdAt: 'desc' } }); }

  async get(id: string) {
    const item = await this.prisma.school.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('School not found');
    return item;
  }

  create(data: CreateSchoolDto) { return this.prisma.school.create({ data }); }

  async update(id: string, data: UpdateSchoolDto) {
    await this.get(id);
    return this.prisma.school.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.get(id);
    await this.prisma.school.delete({ where: { id } });
    return { ok: true };
  }
}
