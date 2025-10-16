import { IsOptional, IsString } from 'class-validator'
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto'

export class ListStudentsDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  q?: string
}
