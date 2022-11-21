import { UserEntity } from '../entities/user.entity';
import { UserCourseEntity } from '../../user_course/entities/usercourse.entity';

type K = {
  password: string;
  users_: UserCourseEntity[];
};
export type UserType = Omit<UserEntity, 'hashPassword'>;
