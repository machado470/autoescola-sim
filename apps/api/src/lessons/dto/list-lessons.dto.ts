import { IsOptional, IsString } from 'class-validator'
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'

export class ListLessonsDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  q?: string
}
