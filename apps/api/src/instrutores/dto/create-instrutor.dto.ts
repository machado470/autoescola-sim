import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator'

export class CreateInstrutorDto {
  @IsString()
  @IsNotEmpty()
  nome!: string

  @IsEmail()
  email!: string

  @IsString()
  @IsNotEmpty()
  senha!: string

  @IsOptional()
  @IsString()
  @Matches(/^[A-Z0-9]{5,15}$/iu, {
    message: 'cnh must be an alphanumeric value between 5 and 15 characters',
  })
  cnh?: string
}
