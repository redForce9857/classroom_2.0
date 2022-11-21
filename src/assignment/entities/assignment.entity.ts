//nigga
import { CourseEntity } from 'src/course/entities/course.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'assignments' })
export class AssignmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  // Необязательное поле
  @Column({ default: '' })
  link: string;

  // if its right
  @ManyToOne(
    () => CourseEntity,
    (courseeee: CourseEntity) => courseeee.assignments
  )
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @Column({ default: true })
  allStudents: boolean;

  @Column()
  gradeId: boolean;
}
