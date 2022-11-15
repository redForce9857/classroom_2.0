import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "grades" })
export class GradeEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  mark: number;

}
