import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto, UpdateSchoolDto } from './dto/school.dto';

@Controller('schools')
export class SchoolController {
  constructor(private service: SchoolService) {}
  @Get() list() { return this.service.list(); }
  @Get(':id') get(@Param('id') id: string) { return this.service.get(id); }
  @Post() create(@Body() dto: CreateSchoolDto) { return this.service.create(dto); }
  @Put(':id') update(@Param('id') id: string, @Body() dto: UpdateSchoolDto) {
    return this.service.update(id, dto);
  }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
