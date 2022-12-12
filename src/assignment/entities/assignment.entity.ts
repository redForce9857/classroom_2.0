import { CourseEntity } from "src/course/entities/course.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

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

  @Column({ nullable: true })
  deadline: Date;

  @Column({ nullable: true })
  maxGrade: number;
}
