import { UserCourseEntity } from "src/user_course/entities/usercourse.entity";
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { hash } from "bcrypt";
import { CommentEntity } from "../../comment/entities/comment.entity";
import { GradeEntity } from "../../grade/entities/grade.entity";

@Entity({ name: "users" })
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

  @OneToMany(() => CommentEntity, (comment) => comment.author_)
  comments: CommentEntity[];

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => GradeEntity, (grade) => grade.user_, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  grades: GradeEntity[];
}
