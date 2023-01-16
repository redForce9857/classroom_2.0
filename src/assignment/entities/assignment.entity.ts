import { CourseEntity } from "src/course/entities/course.entity";
import { UserEntity } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GradeEntity } from "../../grade/entities/grade.entity";
import { Max, Min } from "class-validator";

@Entity({ name: "assignments" })
export class AssignmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  theme?: string;

  // Необязательное поле
  @Column({ default: "", nullable: true })
  link?: string;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  time: string;

  // if it's right
  @ManyToOne(() => CourseEntity, (course) => course.assignments_)
  course_: CourseEntity;

  @Column({ default: true, nullable: true })
  all_students?: boolean;

  @Column({ nullable: true })
  deadline: Date;

  @Column({ default: 0 })
  @Max(100)
  @Min(0)
  maxGrade: number;

  @ManyToOne(() => UserEntity)
  user_: UserEntity;

  @ManyToMany(() => UserEntity, { nullable: true })
  @JoinTable({ name: "users_" })
  users_: UserEntity[];

  @OneToMany(() => GradeEntity, (grade) => grade.assignment_, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  grades: GradeEntity[];
}
