import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course/course.module';
import { AssignmentModule } from './assignment/assignment.module';
import { TasksStreamModule } from './tasks-stream/tasks-stream.module';
import { dataSourceOptions } from 'db/data-source';
import { GradeModule } from './grade/grade.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    CourseModule,
    AssignmentModule,
    TasksStreamModule,
    GradeModule,
    GoogleAuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
