import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AlunosService } from './alunos.service'
import { CreateAlunoDto } from './dto/create-aluno.dto'
import { UpdateAlunoDto } from './dto/update-aluno.dto'

@ApiTags('Alunos')
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunosService.create(createAlunoDto)
  }

  @Get()
  findAll() {
    return this.alunosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.alunosService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ) {
    return this.alunosService.update(id, updateAlunoDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.alunosService.remove(id)
  }
}
