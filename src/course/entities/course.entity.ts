import { AssignmentEntity } from "src/assignment/entities/assigments.entity";
import { TasksStreamEntity } from "src/tasks-stream/entities/tasks-stream.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { generator } from "../idGen";
import { RolesEntity } from "./roles.entity";

@Entity({name: 'courses'})
export class CourseEntity {
  
  @PrimaryColumn()
  id:string = generator()
  
  @Column()
  title: string;

  @Column({nullable: true})
  room?: string;

  @OneToMany(() => TasksStreamEntity, (taskStream) => taskStream.course)
  course?: TasksStreamEntity[];

  @OneToOne(() => RolesEntity)
  @JoinColumn()
  rolesId: RolesEntity

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.course)
  assignments?: AssignmentEntity[];
}
