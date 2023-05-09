import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { TakeCourseDto } from '../../course/dto/select-course.dto';
import { CourseEntity } from '../../course/model/course.model';
import { CourseService } from '../../course/service/course.service';
import { StudentEntity } from '../../student/model/student.model';
import { AddCoursesStudyScheduleDto } from '../dto/add-courses-study-schedule.dto';
import { StudyScheduleError } from '../error/study-schedule.error';
import { ScheduleEntity } from '../model/schedule.model';
import {
  StudyScheduleEntity,
  StudyScheduleName,
} from '../model/study-schedule.model';
import { ScheduleService } from './schedule.service';

@Injectable()
export class StudyScheduleService {
  constructor(
    @Inject(StudyScheduleName)
    private readonly studyScheduleRepository: Repository<StudyScheduleEntity>,
    private readonly courseService: CourseService,
    private readonly scheduleService: ScheduleService,
  ) {}

  async getStudySchedule(studentEmail: string) {
    const studySchedule = await this.studyScheduleRepository.findOne({
      relations: {
        student: true,
        schedule: {
          course: true,
        },
        currentCourse: true,
      },
      order: {
        schedule: {
          course: {
            order: 'ASC',
          },
        },
      },
      where: {
        student: {
          email: studentEmail,
        },
      },
    });
    if (!studySchedule) {
      throw new NotFoundException(StudyScheduleError.notFound);
    }
    return studySchedule;
  }

  async createStudySchedule({ student }: { student: StudentEntity }) {
    let studyScheduleExists;
    try {
      studyScheduleExists = await this.getStudySchedule(student.email);
    } catch (err) {}
    if (studyScheduleExists) {
      throw new BadRequestException(StudyScheduleError.scheduleAlreadyCreated);
    }

    const studySchedule = this.studyScheduleRepository.create();
    studySchedule.student = student;

    try {
      const newCreatedStudySchedule = await this.studyScheduleRepository.save(
        studySchedule,
      );
      return {
        ok: true,
        studySchedule: newCreatedStudySchedule.id,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async addCourses({
    addCoursesDto,
    studentEmail,
  }: {
    addCoursesDto: AddCoursesStudyScheduleDto;
    studentEmail: string;
  }) {
    const studySchedule = await this.getStudySchedule(studentEmail);

    const courses = addCoursesDto.courses.map((course) => course.desiredCourse);
    const newCourses = await this.courseService.mapAndCheckCourses(courses);

    const schedule: ScheduleEntity[] = [];
    for (const course of newCourses) {
      try {
        const singleSchedule = await this.scheduleService.create(
          course,
          studySchedule,
        );
        schedule.push(singleSchedule);
      } catch (error) {}
    }

    studySchedule.schedule = [...studySchedule.schedule, ...schedule];

    try {
      await this.studyScheduleRepository.save(studySchedule);
      return {
        ok: true,
        studySchedule: studySchedule.id,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async finishCourse({ studentEmail }: { studentEmail: string }) {
    const studySchedule = await this.getStudySchedule(studentEmail);
    if (!studySchedule.currentCourse) {
      throw new BadRequestException(StudyScheduleError.cantFinishCourse);
    }
    await this.scheduleService.completeSchedule({
      courseId: studySchedule.currentCourse.id,
      studySchedule,
    });
    studySchedule.currentCourse = null;
    try {
      await this.studyScheduleRepository.save(studySchedule);
      return {
        ok: true,
        studySchedule: studySchedule.id,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async takeCourse({
    takeCourseDto,
    studentEmail,
  }: {
    takeCourseDto: TakeCourseDto;
    studentEmail: string;
  }) {
    const courseToTake = await this.courseService.getByName(
      takeCourseDto.course,
    );
    const studySchedule = await this.getStudySchedule(studentEmail);
    await this.canTakeNewCourse({
      courseName: takeCourseDto.course,
      studySchedule,
    });
    studySchedule.currentCourse = courseToTake;
    try {
      await this.studyScheduleRepository.save(studySchedule);
      return {
        ok: true,
        studySchedule: studySchedule.id,
      };
    } catch (error) {
      console.log(error);
    }
  }

  private async canTakeNewCourse({
    studySchedule,
    courseName,
  }: {
    studySchedule: StudyScheduleEntity;
    courseName: string;
  }) {
    const courseExists = studySchedule.schedule.find(
      (schedule) => schedule.course.name == courseName,
    );
    if (!courseExists) {
      throw new BadRequestException(StudyScheduleError.cantTakeCourseNotAdded);
    }
    if (studySchedule.currentCourse) {
      throw new BadRequestException(StudyScheduleError.cantTakeNewCourse);
    }
    await this.studentHasDependencies({
      course: courseExists.course,
      schedule: studySchedule.schedule,
    });
  }

  private async studentHasDependencies({
    course,
    schedule,
  }: {
    schedule: ScheduleEntity[];
    course: CourseEntity;
  }) {
    const courseDeps = course.dependencies?.split(',') || [];
    for (const dep of courseDeps) {
      const course = schedule.find(
        (schedule) => schedule.course.name == dep && schedule.taken,
      );
      if (!course) {
        throw new BadRequestException(StudyScheduleError.missingDependencies);
      }
    }
    return true;
  }
}
