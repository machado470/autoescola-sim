import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { SimuladosService } from './simulados.service'

@ApiTags('Simulados')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('simulados')
export class SimuladosController {
  constructor(private readonly simuladosService: SimuladosService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.simuladosService.create(createQuestionDto)
  }

  @Get()
  findAll() {
    return this.simuladosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.simuladosService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.simuladosService.update(id, updateQuestionDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.simuladosService.remove(id)
  }
}
