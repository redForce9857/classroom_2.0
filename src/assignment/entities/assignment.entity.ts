import { CourseEntity } from "src/course/entities/course.entity";
import { GradeEntity } from "src/grade/entities/grade.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";

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

  // if its right
  @ManyToOne(() => CourseEntity, (course) => course.assignments_)
  course_: CourseEntity;

  @Column({ default: true, nullable: true })
  all_students?: boolean;

  @OneToOne(() => GradeEntity)
  grade_: GradeEntity;

  @Column({ nullable: true })
  deadline: Date;

  @Column({ nullable: true })
  maxGrade: number;
}
