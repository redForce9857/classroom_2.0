import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserCourseEntity } from "../user_course/entities/usercourse.entity";
import { UserModule } from "../user/user.module";
import { UserCourseModule } from "../user_course/user_course.module";
import { CommentEntity } from "./entities/comment.entity";
import { AnnouncementEntity } from "../announcement/entities/announcement.entity";
import { AuthGuard } from "../user/guards/user.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      UserCourseEntity,
      AnnouncementEntity,
    ]),
    UserModule,
    UserCourseModule,
  ],
  providers: [CommentService, AuthGuard],
  controllers: [CommentController],
})
export class CommentModule {}
