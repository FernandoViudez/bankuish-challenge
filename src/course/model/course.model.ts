import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  order: number;

  @Column({ nullable: true })
  dependencies?: string; // course1,course2
}

export const CourseName = 'COURSE';
