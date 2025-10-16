import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateSchoolDto } from './dto/create-school.dto'
import { ListSchoolsDto } from './dto/list-schools.dto'
import { UpdateSchoolDto } from './dto/update-school.dto'
import { SchoolsService } from './schools.service'

@ApiTags('Schools')
@ApiBearerAuth()
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  async create(@Body() createSchoolDto: CreateSchoolDto) {
    const data = await this.schoolsService.create(createSchoolDto)
    return { data, meta: null }
  }

  @Get()
  findAll(@Query() query: ListSchoolsDto) {
    return this.schoolsService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const data = await this.schoolsService.findOne(id)
    return { data, meta: null }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    const data = await this.schoolsService.update(id, updateSchoolDto)
    return { data, meta: null }
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const data = await this.schoolsService.remove(id)
    return { data, meta: null }
  }
}
