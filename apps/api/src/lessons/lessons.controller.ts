import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { ListLessonsDto } from './dto/list-lessons.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { LessonsService } from './lessons.service'

@ApiTags('Lessons')
@ApiBearerAuth()
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    const data = await this.lessonsService.create(createLessonDto)
    return { data, meta: null }
  }

  @Get()
  findAll(@Query() query: ListLessonsDto) {
    return this.lessonsService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const data = await this.lessonsService.findOne(id)
    return { data, meta: null }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    const data = await this.lessonsService.update(id, updateLessonDto)
    return { data, meta: null }
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const data = await this.lessonsService.remove(id)
    return { data, meta: null }
  }
}
