import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '../database/database.module';
import { StudyScheduleController } from './controller/study-schedule.controller';
import { ScheduleEntity, ScheduleName } from './model/schedule.model';
import {
  StudyScheduleEntity,
  StudyScheduleName,
} from './model/study-schedule.model';
import { StudyScheduleService } from './service/study-schedule.service';
import { ScheduleService } from './service/schedule.service';
import { CourseModule } from '../course/course.module';

@Module({
  controllers: [StudyScheduleController],
  imports: [DatabaseModule, CourseModule],
  providers: [
    StudyScheduleService,
    {
      provide: StudyScheduleName,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(StudyScheduleEntity),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: ScheduleName,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ScheduleEntity),
      inject: ['DATA_SOURCE'],
    },
    ScheduleService,
  ],
})
export class StudyScheduleModule {}
