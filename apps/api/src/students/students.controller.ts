import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateStudentDto } from './dto/create-student.dto'
import { ListStudentsDto } from './dto/list-students.dto'
import { UpdateStudentDto } from './dto/update-student.dto'
import { StudentsService } from './students.service'

@ApiTags('Students')
@ApiBearerAuth()
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    const data = await this.studentsService.create(createStudentDto)
    return { data, meta: null }
  }

  @Get()
  findAll(@Query() query: ListStudentsDto) {
    return this.studentsService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const data = await this.studentsService.findOne(id)
    return { data, meta: null }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const data = await this.studentsService.update(id, updateStudentDto)
    return { data, meta: null }
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const data = await this.studentsService.remove(id)
    return { data, meta: null }
  }
}
