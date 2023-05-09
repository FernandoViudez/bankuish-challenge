import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { StudyScheduleModule } from './study-schedule/study-schedule.module';
import { StudentModule } from './student/student.module';
import { DatabaseModule } from './database/database.module';
import { FirebaseAuthStrategy } from './auth/service/firebase-auth.service';

@Module({
  imports: [
    AuthModule,
    CourseModule,
    StudyScheduleModule,
    StudentModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule {}
