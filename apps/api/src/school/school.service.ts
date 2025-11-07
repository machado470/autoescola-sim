import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSchoolDto } from './dto/create-school.dto';

@Injectable()
export class SchoolService {
  constructor(private readonly prisma: PrismaService) {}

  list() { return this.prisma.$queryRaw`SELECT 1 as ok`; } // TODO delegate real
  async get(id: string) { return { id }; }
  create(data: CreateSchoolDto) { return { id: 'temp', ...data }; }
  update(id: string, data: any) { return { id, ...data }; }
  async remove(id: string) { return { id, removed: true }; }
}
