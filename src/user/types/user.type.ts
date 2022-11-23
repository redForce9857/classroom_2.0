import { UserEntity } from '../entities/user.entity';
import { UserCourseEntity } from '../../user_course/entities/usercourse.entity';

export type UserType = Omit<UserEntity, 'hashPassword'>;
