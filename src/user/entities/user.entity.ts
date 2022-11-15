import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'user'})
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: string

  @Column()
  email: string;

  @Column() 
  displayName: string;

  @OneToMany(() => UserCourseEntity, (user) => user.user)
  users: UserCourseEntity[]
}
