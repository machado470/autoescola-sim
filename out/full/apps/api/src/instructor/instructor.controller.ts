import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto, UpdateInstructorDto } from './dto/instructor.dto';

@Controller('instructors')
export class InstructorController {
  constructor(private readonly service: InstructorService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: CreateInstructorDto) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateInstructorDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
