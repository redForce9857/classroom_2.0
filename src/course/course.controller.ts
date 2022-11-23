import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from 'src/user/decorators/user.decorator';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  async findAll(@User('id') id: number) {
    return await this.courseService.getCourses(id);
  }

  @Get('test')
  async bitch() {
    return 'nigga';
  }

  @Get('get-my-courses')
  async getUser(@Req() req: Request) {}
}
