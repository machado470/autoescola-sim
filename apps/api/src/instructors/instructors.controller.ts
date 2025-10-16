import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateInstructorDto } from './dto/create-instructor.dto'
import { ListInstructorsDto } from './dto/list-instructors.dto'
import { UpdateInstructorDto } from './dto/update-instructor.dto'
import { InstructorsService } from './instructors.service'

@ApiTags('Instructors')
@ApiBearerAuth()
@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Post()
  async create(@Body() createInstructorDto: CreateInstructorDto) {
    const data = await this.instructorsService.create(createInstructorDto)
    return { data, meta: null }
  }

  @Get()
  findAll(@Query() query: ListInstructorsDto) {
    return this.instructorsService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const data = await this.instructorsService.findOne(id)
    return { data, meta: null }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    const data = await this.instructorsService.update(id, updateInstructorDto)
    return { data, meta: null }
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const data = await this.instructorsService.remove(id)
    return { data, meta: null }
  }
}
