import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CourseEntity } from '../../course/model/course.model';
import { StudentEntity } from '../../student/model/student.model';
import { ScheduleEntity } from './schedule.model';

@Entity()
export class StudyScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => StudentEntity)
  @JoinColumn()
  student: StudentEntity;

  @OneToOne(() => CourseEntity)
  currentCourse?: CourseEntity;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.studySchedule)
  schedule?: ScheduleEntity[];
}

export const StudyScheduleName = 'STUDY_SCHEDULE';
