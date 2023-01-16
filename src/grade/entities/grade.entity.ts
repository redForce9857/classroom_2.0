import { AssignmentEntity } from "src/assignment/entities/assignment.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Max, Min } from "class-validator";

@Entity({ name: "grades" })
export class GradeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (assignment) => assignment.grades, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user_: UserEntity;

  @ManyToOne(() => AssignmentEntity, (assignment) => assignment.grades, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  assignment_: AssignmentEntity;

  @Max(100)
  @Min(0)
  @Column({ default: 0 })
  mark: number;
}
