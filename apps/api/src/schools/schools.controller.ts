import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateSchoolDto } from './dto/create-school.dto'
import { UpdateSchoolDto } from './dto/update-school.dto'
import { SchoolsService } from './schools.service'

@ApiTags('Schools')
@ApiBearerAuth()
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto)
  }

  @Get()
  findAll() {
    return this.schoolsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.schoolsService.findOne(id)
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolsService.update(id, updateSchoolDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.schoolsService.remove(id)
  }
}
