import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
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
