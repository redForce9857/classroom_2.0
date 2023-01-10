import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorator/roles.decorator";
import { UserRole } from "src/user_course/enum/role.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCourseEntity } from "src/user_course/entities/usercourse.entity";
import { Repository } from "typeorm/repository/Repository";

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
      .findOne({
        where: {
          user_: user.id,
          course_: { id: params.id },
        },
      })
      .then((data) => (role = data.role));
    if (!requiredRoles) return true;

    return requiredRoles.find((r) => r == role) != undefined;
  }
}
