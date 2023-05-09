import { Body, Controller, Post } from '@nestjs/common';
import { NewCourseDto } from '../dto/new-course.dto';
import { CourseService } from '../service/course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() newCourseDto: NewCourseDto) {
    return await this.courseService.create(newCourseDto);
  }
}
