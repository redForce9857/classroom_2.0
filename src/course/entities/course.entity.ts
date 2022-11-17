import { AssignmentEntity } from 'src/assignment/entities/assigments.entity';
import { TasksStreamEntity } from 'src/tasks-stream/entities/tasks-stream.entity';
import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { generator } from '../idGen';

@Entity({ name: 'courses' })
export class CourseEntity {
  @PrimaryColumn()
  id: string = generator();

  @Column()
  title: string;

  @Column({ nullable: true })
  room?: string;

  @OneToMany(() => TasksStreamEntity, (taskStream) => taskStream.course_)
  course_?: TasksStreamEntity[];

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.course_, {
    nullable: true,
  })
  assignments_?: AssignmentEntity[];

  @OneToMany(() => UserCourseEntity, (section) => section.course_)
  sections_: UserCourseEntity[];
}
