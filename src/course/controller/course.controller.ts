import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewCourseDto } from '../dto/new-course.dto';
import { CourseService } from '../service/course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getCourses() {
    return await this.courseService.getAll();
  }

  @Post()
  // TODO: Allow multiple courses creation (v2)
  async create(@Body() newCourseDto: NewCourseDto) {
    return await this.courseService.create(newCourseDto);
  }
}
