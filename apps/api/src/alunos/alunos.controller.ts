import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto, UpdateAlunoDto } from './alunos.dto';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly service: AlunosService) {}

  @Get()
  list() { return this.service.list(); }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) { return this.service.get(id); }

  @Post()
  create(@Body() dto: CreateAlunoDto) { return this.service.create(dto); }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAlunoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
