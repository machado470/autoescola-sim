import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator'

export class CreateStudentDto {
  @IsString()
  name!: string

  @IsEmail()
  email!: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsDateString()
  birth!: string

  @IsString()
  schoolId!: string
}
