import { Column, Entity, PrimaryColumn } from "typeorm";
import { generator } from "../idGen";

@Entity({name: 'courses'})
export class CourseEntity {
  @PrimaryColumn()
  id:string = generator()
  @Column()
  title: string;
}
