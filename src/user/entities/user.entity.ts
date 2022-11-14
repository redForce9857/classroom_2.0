import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'user'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  displayName: string;
}
