import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateSimuladoDto } from './dto/create-simulado.dto'
import { UpdateSimuladoDto } from './dto/update-simulado.dto'
import { SimuladosService } from './simulados.service'

@ApiTags('Simulados')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
