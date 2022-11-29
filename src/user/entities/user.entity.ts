import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  display_name: string;

  @Column({ nullable: true })
  password?: string;
  @Column({ nullable: true })
  access_token: string;

  @OneToMany(() => UserCourseEntity, (user) => user.user_, { cascade: true })
  users_: UserCourseEntity[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = await hash(this.password, 10);
  }
}
