import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlunosService {
  constructor(private readonly prisma: PrismaService) {}
  async list() { return []; }                 // TODO: delegate real
  async get(id: string) { return { id }; }    // TODO
  async create(data: any) { return data; }    // TODO
  async update(id: string, data: any) { return { id, ...data }; } // TODO
  async remove(id: string) { return { id, removed: true }; }      // TODO
}
