import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';
import { AssignmentEntity } from 'src/assignment/entities/assignment.entity';
import { TasksStreamEntity } from 'src/tasks-stream/entities/tasks-stream.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generator } from '../idGen';

@Entity({ name: 'courses' })
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: string = generator();

  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  room: string;

  @OneToMany(() => TasksStreamEntity, (taskStream) => taskStream.course_)
  course_?: TasksStreamEntity[];

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.course_, {
    nullable: true,
  })
  assignments_?: AssignmentEntity[];

  @OneToMany(() => UserCourseEntity, (section) => section.course_)
  sections_: UserCourseEntity[];
}
