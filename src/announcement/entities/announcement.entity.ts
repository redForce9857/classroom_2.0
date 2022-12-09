import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from "typeorm";
import { StreamEntity } from "src/stream/entities/stream.entity";
import { CourseEntity } from "src/course/entities/course.entity";
@Entity({ name: "announcement" })
export class AnnouncementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => CourseEntity)
  course_: CourseEntity;
}
