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
import { CreateInstrutorDto } from './dto/create-instrutor.dto'
import { UpdateInstrutorDto } from './dto/update-instrutor.dto'
import { InstrutoresService } from './instrutores.service'

@ApiTags('Instrutores')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('instrutores')
export class InstrutoresController {
  constructor(private readonly instrutoresService: InstrutoresService) {}

  @Post()
  create(@Body() createInstrutorDto: CreateInstrutorDto) {
    return this.instrutoresService.create(createInstrutorDto)
  }

  @Get()
  findAll() {
    return this.instrutoresService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.instrutoresService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInstrutorDto: UpdateInstrutorDto,
  ) {
    return this.instrutoresService.update(id, updateInstrutorDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.instrutoresService.remove(id)
  }
}
