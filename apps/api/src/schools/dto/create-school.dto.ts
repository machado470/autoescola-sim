import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsString()
  @IsNotEmpty()
  cnpj!: string

  @IsString()
  @IsNotEmpty()
  address!: string

  @IsOptional()
  @IsString()
  phone?: string
}
