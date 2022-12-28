import { UserCourseEntity } from "src/user_course/entities/usercourse.entity";
import { AssignmentEntity } from "src/assignment/entities/assignment.entity";
import { TasksStreamEntity } from "src/tasks-stream/entities/tasks-stream.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { generator } from "../idGen";

@Entity({ name: "courses" })
export class CourseEntity {
  @PrimaryColumn()
  id: string = generator();

  @Column({ unique: true })
  title: string;

  @Column()
  room: string;

  @OneToMany(() => TasksStreamEntity, (taskStream) => taskStream.course_)
  course_?: TasksStreamEntity[];

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.course_, {
    nullable: true,
    cascade: true,
  })
  assignments_?: AssignmentEntity[];

  @OneToMany(() => UserCourseEntity, (section) => section.course_, {
    cascade: true,
  })
  sections_: UserCourseEntity[];
}
