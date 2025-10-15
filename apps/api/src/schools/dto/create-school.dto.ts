import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsNotEmpty()
  city!: string

  @IsOptional()
  @IsString()
  phone?: string
}
