import { Controller, Get } from '@nestjs/common';
import { Body, Post, UseGuards } from '@nestjs/common/decorators';
import { UserD } from '../../auth/decorators/user.decorator';
import { FirebaseAuthGuard } from '../../auth/guard/firebase-auth.guard';
import { StudentEntity } from '../../student/model/student.model';
import { AddCoursesStudyScheduleDto } from '../dto/add-courses-study-schedule.dto';
import { StudyScheduleService } from '../service/study-schedule.service';

@UseGuards(FirebaseAuthGuard)
@Controller('study-schedule')
export class StudyScheduleController {
  constructor(private readonly studyScheduleService: StudyScheduleService) {}

  @Get()
  async getStudySchedule(@UserD() user: StudentEntity) {
    return await this.studyScheduleService.getStudySchedule(user.email);
  }

  @Post()
  async create(@UserD() student: StudentEntity) {
    return await this.studyScheduleService.createStudySchedule({
      student,
    });
  }

  @Post('/add-courses')
  async addCourses(
    @UserD() student: StudentEntity,
    @Body() addCoursesDto: AddCoursesStudyScheduleDto,
  ) {
    return await this.studyScheduleService.addCourses({
      studentEmail: student.email,
      addCoursesDto,
    });
  }
}
