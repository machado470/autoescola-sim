import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InstructorService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(){ return []; }
  async findOne(id: string){ return { id }; }
  async create(data: any){ return data; }
  async update(id: string, data: any){ return { id, ...data }; }
  async remove(id: string){ return { id, removed: true }; }
}
