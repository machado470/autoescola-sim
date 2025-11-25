import { IsString, Length } from 'class-validator';

export class CreateInstructorDto {
  @IsString()
  @Length(2, 100)
  name!: string;

  @IsString()
  license!: string;

  @IsString()
  schoolId!: string;
}

export class UpdateInstructorDto {
  @IsString()
  @Length(2, 100)
  name?: string;

  @IsString()
  license?: string;

  @IsString()
  schoolId?: string;
}
