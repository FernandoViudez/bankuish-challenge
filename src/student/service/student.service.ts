import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentError } from '../error/student.error';
import { StudentEntity, StudentName } from '../model/student.model';

@Injectable()
export class StudentService {
  constructor(
    @Inject(StudentName)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async getStudentByEmail(email: string) {
    const student = await this.studentRepository.findOneBy({
      email,
    });
    if (!student) {
      throw new NotFoundException(StudentError.notFound);
    }
    return student;
  }

  async create(email: string) {
    const student = this.studentRepository.create();
    student.email = email;
    try {
      return await this.studentRepository.save(student);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
