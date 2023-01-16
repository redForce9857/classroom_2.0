import { UserCourseEntity } from "src/user_course/entities/usercourse.entity";
import { AssignmentEntity } from "src/assignment/entities/assignment.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { generator } from "../idGen";
import { UserEntity } from "../../user/entities/user.entity";

@Entity({ name: "courses" })
export class CourseEntity {
  @PrimaryColumn()
  id: string = generator();

  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  room: string;

  @Column({ nullable: true })
  creatorAvatar: string;

  @Column({ default: "blue", nullable: true })
  background: string;

  @Column({ nullable: true })
  chapter: string;

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.course_, {
    nullable: true,
    cascade: true,
  })
  assignments_?: AssignmentEntity[];

  @OneToMany(() => UserCourseEntity, (section) => section.course_, {
    cascade: true,
  })
  sections_: UserCourseEntity[];

  @ManyToOne(() => UserEntity)
  creator_: UserEntity;
}
