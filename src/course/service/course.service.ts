import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { NewCourseDto } from '../dto/new-course.dto';
import { CourseError } from '../error/course.error';
import { CourseEntity, CourseName } from '../model/course.model';

@Injectable()
export class CourseService {
  constructor(
    @Inject(CourseName)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async getByName(courseName: string) {
    const course = await this.courseRepository.findOne({
      where: {
        name: courseName,
      },
    });
    if (!course) {
      throw new NotFoundException(CourseError.notFound);
    }
    return course;
  }

  async mapAndCheckCourses(courses: string[]) {
    const newCourses: CourseEntity[] = [];
    for (const course of courses) {
      const _course = await this.getByName(course);
      newCourses.push(_course);
    }
    return newCourses;
  }

  async orderCourses(courses: CourseEntity[]) {
    courses.sort(
      (prevCourse, nextCourse) => prevCourse.order - nextCourse.order,
    );
  }

  async create(newCourseDto: NewCourseDto) {
    let courseExists;
    try {
      courseExists = await this.getByName(newCourseDto.name);
    } catch (error) {}
    if (courseExists) {
      throw new BadRequestException(CourseError.alreadyExists);
    }

    const course = this.courseRepository.create();

    if (newCourseDto.dependencies && newCourseDto.dependencies.length) {
      await this.mapAndCheckCourses(newCourseDto.dependencies);
      course.dependencies = newCourseDto.dependencies.join(',');
    }

    course.name = newCourseDto.name;
    course.order = newCourseDto.order;
    try {
      const newCourse = await this.courseRepository.save(course);
      return {
        ok: true,
        newCourse: newCourse.id,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
