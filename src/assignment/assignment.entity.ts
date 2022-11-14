import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'assignments' })
export class AssignmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  // Необязательное поле
  @Column({ default: '' })
  link: string;

  // if its right
  @Column()
  courseIds: Array<any>;

  @Column({ default: true })
  allStudents: boolean;

  @Column()
  gradeId: boolean;
}
