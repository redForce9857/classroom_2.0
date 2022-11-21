import {
  Module,
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course/course.module';
import { AssignmentModule } from './assignment/assignment.module';
import { TasksStreamModule } from './tasks-stream/tasks-stream.module';
import { dataSourceOptions } from 'db/data-source';
import { UserCourseModule } from './user_course/user_course.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { UserModule } from './user/user.module';
import { StreamModule } from './stream/stream.module';
import { GradeModule } from './grade/grade.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { GoogleAuthController } from './google-auth/google-auth.controller';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    CourseModule,
    AssignmentModule,
    TasksStreamModule,
    UserCourseModule,
    GoogleAuthModule,
    UserModule,
    StreamModule,
    GradeModule,
    AnnouncementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'auth/(.*)', method: RequestMethod.ALL })
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
