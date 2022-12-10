import { AssignmentEntity } from "src/assignment/entities/assignment.entity";
import { UserEntity } from "src/user/entities/user.entity";
import {
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "grades" })
@Check('"mark">0 AND "mark"<=100')
export class GradeEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => UserEntity)
  user_: UserEntity;

  @ManyToOne(() => AssignmentEntity)
  assignment_: AssignmentEntity;

  @Column()
  mark: number;
}
