import { IsInt, IsOptional, IsString, IsBoolean, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class RandomQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  difficulty?: string; // EASY | MEDIUM | HARD

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',').map((v: string) => parseInt(v, 10)) : []))
  excludeIds?: number[];

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  includeAnswers?: boolean = false;
}
