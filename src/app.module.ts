import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { CourseModule } from "./course/course.module";
import { AssignmentModule } from "./assignment/assignment.module";
import { dataSourceOptions } from "db/data-source";
import { UserCourseModule } from "./user_course/user_course.module";
import { GoogleAuthModule } from "./google-auth/google-auth.module";
import { UserModule } from "./user/user.module";
import { GradeModule } from "./grade/grade.module";
import { AnnouncementModule } from "./announcement/announcement.module";
import { AuthMiddleware } from "./user/middlewares/auth.middleware";
import { CommentModule } from "./comment/comment.module";
import { MulterModule } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    CourseModule,
    AssignmentModule,
    UserCourseModule,
    GoogleAuthModule,
    UserModule,
    GradeModule,
    AnnouncementModule,
    CommentModule,
    MulterModule.register({ storage: memoryStorage() }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: "auth/(.*)", method: RequestMethod.ALL },
        { path: "/user/register", method: RequestMethod.ALL },
        { path: "/user/login", method: RequestMethod.ALL }
      )
      .forRoutes({
        path: "*",
        method: RequestMethod.ALL,
      });
  }
}
