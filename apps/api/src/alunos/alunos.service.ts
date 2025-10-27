import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlunoDto, UpdateAlunoDto } from './alunos.dto';

@Injectable()
export class AlunosService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.aluno.findMany({ orderBy: { createdAt: 'desc' }});
  }

  async get(id: string) {
    const aluno = await this.prisma.aluno.findUnique({ where: { id } });
    if (!aluno) throw new NotFoundException('Aluno não encontrado');
    return aluno;
  }

  create(data: CreateAlunoDto) {
    return this.prisma.aluno.create({ data });
  }

  async update(id: string, data: UpdateAlunoDto) {
    await this.get(id);
    return this.prisma.aluno.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.get(id);
    await this.prisma.aluno.delete({ where: { id } });
    return { ok: true };
  }
}
