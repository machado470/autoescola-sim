import { IsOptional, IsObject } from 'class-validator'

export class StartExamDto {
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>
}
