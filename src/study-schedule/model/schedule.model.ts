import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CourseEntity } from '../../course/model/course.model';
import { StudyScheduleEntity } from './study-schedule.model';

@Entity()
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CourseEntity)
  course: CourseEntity;

  @Column({ nullable: false, default: false })
  taken: boolean;

  @ManyToOne(() => StudyScheduleEntity, (schedule) => schedule.schedule)
  studySchedule: StudyScheduleEntity;
}

export const ScheduleName = 'SCHEDULE';
