import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { mapCreateDtoToPrisma, mapUpdateDtoToPrisma } from './mappers/question.mapper';

@Injectable()
export class SimuladosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateQuestionDto) {
    const data = mapCreateDtoToPrisma(dto);
    return this.prisma.question.create({ data });
  }

  findOne(id: number) {
    return this.prisma.question.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateQuestionDto) {
    const data = mapUpdateDtoToPrisma(dto);
    return this.prisma.question.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.question.delete({ where: { id } });
  }
}
