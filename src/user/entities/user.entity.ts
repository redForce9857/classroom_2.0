import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  display_name: string;

  @Column({ nullable: true })
  password?: string;
  @Column()
  access_token: string;

  @OneToMany(() => UserCourseEntity, (user) => user.user_)
  users_: UserCourseEntity[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = await hash(this.password, 10);
  }
}
