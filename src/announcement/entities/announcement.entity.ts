import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from 'typeorm';
import { StreamEntity } from 'src/stream/entities/stream.entity';
@Entity({ name: 'announcement' })
export class AnnouncementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  type: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => StreamEntity)
  announcement_: AnnouncementEntity;
}
