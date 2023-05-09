import { IsDefined, IsString } from 'class-validator';

export class TakeCourseDto {
  @IsString()
  @IsDefined()
  readonly course: string;
}
