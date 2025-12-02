import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePhaseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  order: number;

  @IsUUID()
  categoryId: string;
}
