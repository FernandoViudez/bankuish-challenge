import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CourseEntity } from '../../course/model/course.model';
import { ScheduleError } from '../error/schedule.error';
import { ScheduleEntity, ScheduleName } from '../model/schedule.model';
import { StudyScheduleEntity } from '../model/study-schedule.model';

@Injectable()
export class ScheduleService {
  constructor(
    @Inject(ScheduleName)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async getScheduleByCourseIdAndStudySchedule({
    courseId,
    studyScheduleId,
  }: {
    courseId: number;
    studyScheduleId: number;
  }) {
    const schedule = await this.scheduleRepository.findOne({
      where: {
        studySchedule: {
          id: studyScheduleId,
        },
        course: {
          id: courseId,
        },
      },
    });
    if (!schedule) {
      throw new NotFoundException(ScheduleError.notFound);
    }
    return schedule;
  }

  async create(courseEntity: CourseEntity, studySchedule: StudyScheduleEntity) {
    let scheduleExists;
    try {
      scheduleExists = await this.getScheduleByCourseIdAndStudySchedule({
        courseId: courseEntity.id,
        studyScheduleId: studySchedule.id,
      });
    } catch (err) {}
    if (scheduleExists) {
      throw new BadRequestException(ScheduleError.alreadyExists);
    }
    const schedule = this.scheduleRepository.create();
    schedule.course = courseEntity;
    schedule.studySchedule = studySchedule;
    try {
      return await this.scheduleRepository.save(schedule);
    } catch (error) {
      console.log(error);
    }
  }

  async completeSchedule({
    courseId,
    studySchedule,
  }: {
    courseId: number;
    studySchedule: StudyScheduleEntity;
  }) {
    const schedule = await this.getScheduleByCourseIdAndStudySchedule({
      courseId,
      studyScheduleId: studySchedule.id,
    });
    schedule.taken = true;
    try {
      await this.scheduleRepository.save(schedule);
      return {
        ok: true,
        schedule: schedule.id,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
