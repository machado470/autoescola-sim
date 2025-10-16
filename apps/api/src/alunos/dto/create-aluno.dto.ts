import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator'

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$/u, {
    message: 'cpf must contain exactly 11 digits',
  })
  cpf!: string

  @IsEmail()
  email!: string

  @IsString()
  @IsOptional()
  telefone?: string

  @IsDateString()
  @IsOptional()
  dataNascimento?: string

  @IsString()
  @IsNotEmpty()
  senha!: string
}
