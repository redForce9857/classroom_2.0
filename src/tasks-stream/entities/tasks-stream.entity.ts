import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "../../course/entities/course.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class TasksStream {
  @PrimaryGeneratedColumn()
  id:string;

  @Column()
  topic:string;

  @ManyToOne(() => CourseEntity, (course) => course.tasksStream)
  subject: CourseEntity;

}
