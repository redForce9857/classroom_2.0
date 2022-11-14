import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { generator } from "../idGen";
import { RolesEntity } from "./roles.entity";

@Entity({name: 'courses'})
export class CourseEntity {
  
  @PrimaryColumn()
  id:string = generator()
  
  @Column()
  title: string;

  @Column({nullable: true})
  room?: string;

  // @OneToMany()
  subject?: string;

  @OneToOne(() => RolesEntity)
  @JoinColumn()
  rolesId: RolesEntity

  @Column()
  userId: 
}
