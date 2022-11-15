import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCourseEntity } from './entities/usercourse.entity';


@Module(
	{
	imports: [TypeOrmModule.forFeature([UserCourseEntity])]
	}
)
export class UserCourseModule {}
