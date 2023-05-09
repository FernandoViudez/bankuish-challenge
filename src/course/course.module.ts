import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '../database/database.module';
import { CourseController } from './controller/course.controller';
import { CourseEntity, CourseName } from './model/course.model';
import { CourseService } from './service/course.service';

@Module({
  controllers: [CourseController],
  imports: [DatabaseModule],
  exports: [CourseService],
  providers: [
    CourseService,
    {
      provide: CourseName,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(CourseEntity),
      inject: ['DATA_SOURCE'],
    },
  ],
})
export class CourseModule {}
