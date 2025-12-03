import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        phases: { orderBy: { order: 'asc' } },
        questions: true,
        lessons: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        phases: { orderBy: { order: 'asc' } },
        questions: true,
        lessons: true,
      },
    });

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.ensureExists(id);

    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);

    return this.prisma.category.delete({
      where: { id },
    });
  }

  private async ensureExists(id: string) {
    const exists = await this.prisma.category.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Category not found');
  }
}
