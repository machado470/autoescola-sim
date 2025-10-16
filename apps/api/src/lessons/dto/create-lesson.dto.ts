import { IsDateString, IsOptional, IsString } from 'class-validator'

export class CreateLessonDto {
  @IsOptional()
  @IsDateString()
  date?: string

  @IsOptional()
  @IsString()
  notes?: string

  @IsString()
  instructorId!: string

  @IsString()
  studentId!: string

  @IsString()
  schoolId!: string
}
