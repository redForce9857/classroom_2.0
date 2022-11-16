import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, UserCourseEntity])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {

}
