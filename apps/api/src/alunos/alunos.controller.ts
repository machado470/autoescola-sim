import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { AlunosService } from './alunos.service'
import { CreateAlunoDto, UpdateAlunoDto } from './alunos.dto'

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Get()
  findAll() {
    return this.alunosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alunosService.findOne(Number(id))
  }

  @Post()
  create(@Body() data: CreateAlunoDto) {
    return this.alunosService.create(data)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateAlunoDto) {
    return this.alunosService.update(Number(id), data)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunosService.remove(Number(id))
  }
}
