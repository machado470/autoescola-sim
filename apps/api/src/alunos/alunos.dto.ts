import { IsString, IsEmail, IsOptional } from 'class-validator'

export class CreateAlunoDto {
  @IsString()
  nome: string

  @IsString()
  cpf: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  telefone?: string

  @IsOptional()
  dataNascimento?: Date
}

export class UpdateAlunoDto extends CreateAlunoDto {}
