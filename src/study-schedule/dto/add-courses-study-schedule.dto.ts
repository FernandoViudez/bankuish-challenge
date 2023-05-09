import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AddCoursesStudyScheduleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  readonly courses: CourseDto[];
}

class CourseDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly desiredCourse: string;
}
