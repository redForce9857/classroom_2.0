// TODO: Подумать о привязке файлов к объявлению.
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CourseEntity } from "src/course/entities/course.entity";
import { CommentEntity } from "../../comment/entities/comment.entity";
@Entity({ name: "announcement" })
export class AnnouncementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  text: string;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @ManyToOne(() => CourseEntity)
  course_: CourseEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.announcement)
  comments: CommentEntity[];
}
