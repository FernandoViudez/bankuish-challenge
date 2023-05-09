import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;
}

export const StudentName = 'STUDENT';
