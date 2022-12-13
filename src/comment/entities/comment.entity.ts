import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnnouncementEntity } from "../../announcement/entities/announcement.entity";
import { UserEntity } from "src/user/entities/user.entity";

@Entity({ name: "comments" })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @ManyToOne(
    () => AnnouncementEntity,
    (announcement) => announcement.comments,
    { onDelete: "CASCADE" }
  )
  announcement: AnnouncementEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: "CASCADE" })
  author_: UserEntity;
}
