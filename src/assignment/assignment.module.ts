import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseModule } from "src/course/course.module";
import { CourseEntity } from "src/course/entities/course.entity";
import { UserModule } from "src/user/user.module";
import { UserCourseEntity } from "src/user_course/entities/usercourse.entity";
import { UserCourseModule } from "src/user_course/user_course.module";
import { AssignmentController } from "./assignment.controller";
import { AssignmentService } from "./assignment.service";
import { AssignmentEntity } from "./entities/assignment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssignmentEntity,
      UserCourseEntity,
      CourseEntity,
    ]),
    UserModule,
    CourseModule,
    UserCourseModule,
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
