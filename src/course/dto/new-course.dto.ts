import {
  IsArray,
  IsDefined,
  IsString,
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class NewCourseDto {
  @IsString()
  @IsDefined()
  readonly name: string;
  @IsNumber()
  @IsDefined()
  readonly order: number;
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  readonly dependencies?: string[];
}
