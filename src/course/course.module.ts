import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';

import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';
import { UserCourseModule } from 'src/user_course/user_course.module';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity, UserCourseEntity, UserEntity]),
    UserCourseModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
