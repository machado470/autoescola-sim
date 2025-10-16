import { IsEmail, IsOptional, IsString } from 'class-validator'

export class CreateInstructorDto {
  @IsString()
  name!: string

  @IsEmail()
  email!: string

  @IsOptional()
  @IsString()
  phone?: string
}
