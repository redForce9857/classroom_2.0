import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  display_name: string;

  @Column({ nullable: true })
  password?: string;

  @OneToMany(() => UserCourseEntity, (user) => user.user_)
  users_: UserCourseEntity[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = await hash(this.password, 10);
  }
}
