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
import { CreateSimuladoDto } from './dto/create-simulado.dto'
import { UpdateSimuladoDto } from './dto/update-simulado.dto'
import { SimuladosService } from './simulados.service'

@ApiTags('Simulados')
@Controller('simulados')
export class SimuladosController {
  constructor(private readonly simuladosService: SimuladosService) {}

  @Post()
  create(@Body() createSimuladoDto: CreateSimuladoDto) {
    return this.simuladosService.create(createSimuladoDto)
  }

  @Get()
  findAll() {
    return this.simuladosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.simuladosService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSimuladoDto: UpdateSimuladoDto,
  ) {
    return this.simuladosService.update(id, updateSimuladoDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.simuladosService.remove(id)
  }
}
