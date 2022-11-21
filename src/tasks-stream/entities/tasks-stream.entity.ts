import { CourseEntity } from 'src/course/entities/course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task_stream' })
export class TasksStreamEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  topic: string;

  @ManyToOne(() => CourseEntity, (courseeee) => courseeee.course_)
  course_: CourseEntity;

}
