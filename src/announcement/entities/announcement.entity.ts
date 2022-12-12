// TODO: Подумать о привязке файлов к объявлению.
import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from "typeorm";
import { StreamEntity } from "src/stream/entities/stream.entity";
import { CourseEntity } from "src/course/entities/course.entity";
import { timestamp } from "rxjs";
import { UserEntity } from "src/user/entities/user.entity";
@Entity({ name: "announcement" })
export class AnnouncementEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => UserEntity)
  user_: UserEntity;
}
