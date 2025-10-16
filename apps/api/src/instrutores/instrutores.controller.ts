import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common'
import { CreateInstructorDto, UpdateInstructorDto } from './instrutores.dto'
import { InstrutoresService } from './instrutores.service'

@Controller('instructors')
export class InstrutoresController {
  constructor(private readonly instrutoresService: InstrutoresService) {}

  @Get()
  findAll() {
    return this.instrutoresService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.instrutoresService.findOne(id)
  }

  @Post()
  create(@Body() data: CreateInstructorDto) {
    return this.instrutoresService.create(data)
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateInstructorDto,
  ) {
    return this.instrutoresService.update(id, data)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.instrutoresService.remove(id)
  }
}
