import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Param,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { UserRole } from 'src/user_course/enum/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(UserCourseEntity)
    private readonly userCourseRepo: Repository<UserCourseEntity>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    const { user } = context.switchToHttp().getRequest();
    const { params } = context.switchToHttp().getRequest();
    let role: string;
    await this.userCourseRepo
      .createQueryBuilder()
      .select('uc.role')
      .from(UserCourseEntity, 'uc')
      .where('uc.user_id = :u_id AND uc.course_id = :c_code ', {
        u_id: user.id,
        c_code: params.id,
      })
      .getOne()
      .then((data) => (role = data.role));
    if (!requiredRoles) return true;

    return requiredRoles.some((r) => r == role);
  }
}