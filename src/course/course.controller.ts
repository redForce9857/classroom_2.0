import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UserDecorator } from 'src/user/decorator/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(
    @Body() createCourseDto: CreateCourseDto,
    @UserDecorator() user: UserEntity) {
    return this.courseService.create(createCourseDto, user);
  }

  @Post('join/:id')
  async joinUserToCourse(
    @Param('id') course_code: number,
    @UserDecorator() user: UserEntity
  ){
    return await this.courseService.joinUserToCourse(course_code, user)
  }

  @Get('get-all')
  @ApiOperation({ summary: 'Get all courses' })
  async findAll() {
    return await this.courseService.find();
  }

  @Get('test')
  async bitch (){
    return 'nigga';
  }

  @Get('get-my-courses')
  async getUser(@Req() req: Request) {}
}
