import { IsOptional, IsString, Length } from 'class-validator';
export class CreateSchoolDto {
  @IsString() @Length(2, 120)
  name!: string;
}
export class UpdateSchoolDto {
  @IsOptional() @IsString() @Length(2, 120)
  name?: string;
}
