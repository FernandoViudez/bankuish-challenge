import { Module } from '@nestjs/common';
import { StudentService } from './service/student.service';
import { StudentEntity, StudentName } from './model/student.model';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [
    StudentService,
    {
      provide: StudentName,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(StudentEntity),
      inject: ['DATA_SOURCE'],
    },
  ],
  controllers: [],
  imports: [DatabaseModule],
  exports: [StudentService],
})
export class StudentModule {}
