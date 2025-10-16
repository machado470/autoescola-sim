import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator'

export class CreateInstructorDto {
  @IsString()
  @IsNotEmpty()
  nome!: string

  @IsEmail()
  email!: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$/u, {
    message: 'cpf must contain exactly 11 digits',
  })
  cpf!: string

  @IsString()
  @IsNotEmpty()
  senha!: string

  @IsOptional()
  @IsString()
  cnh?: string
}

export class UpdateInstructorDto extends PartialType(CreateInstructorDto) {}
