import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InstrutoresService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(){ return []; }
  async create(data: any){ return data; }
  async findOne(id: string){ return { id }; }
  async update(id: string, data: any){ return { id, ...data }; }
  async remove(id: string){ return { id, removed: true }; }
}
