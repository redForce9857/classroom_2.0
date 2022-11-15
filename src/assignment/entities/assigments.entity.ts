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

  // Необязательное поле
  @Column({ default: "" })
  link: string;

  // if its right
  @ManyToOne(() => CourseEntity, (course) => course.assignments)
  courseId: CourseEntity;

  @Column({ default: true })
  allStudents: boolean;

  @OneToOne(() => GradeEntity)
  @JoinColumn({ name: "grade_id" })
  gradeId: GradeEntity;
}
