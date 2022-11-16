import { CourseEntity } from 'src/course/entities/course.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
@Entity({ name: 'stream' })
export class StreamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToOne(() => CourseEntity)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;
}
