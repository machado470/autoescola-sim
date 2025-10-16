import { IsEmail, IsOptional, IsString, Length, IsDateString } from 'class-validator';

export class CreateAlunoDto {
  @IsString() @Length(3, 120)
  name!: string;

  @IsString() @Length(11, 11)
  cpf!: string;

  @IsEmail()
  email!: string;

  @IsOptional() @IsString() @Length(10, 20)
  telefone?: string;

  @IsOptional() @IsDateString()
  dataNascimento?: string;
}

export class UpdateAlunoDto {
  @IsOptional() @IsString() @Length(3, 120)
  name?: string;

  @IsOptional() @IsString() @Length(11, 11)
  cpf?: string;

  @IsOptional() @IsEmail()
  email?: string;

  @IsOptional() @IsString() @Length(10, 20)
  telefone?: string;

  @IsOptional() @IsDateString()
  dataNascimento?: string;
}
