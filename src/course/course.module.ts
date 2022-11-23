import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, UserCourseEntity,UserEntity]), UserModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
