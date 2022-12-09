import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Delete,
  Put,
  UseGuards,
  Res,
  Patch,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UserDecorator } from "src/user/decorator/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Roles } from "src/user/decorator/roles.decorator";
import { UserRole } from "src/user_course/enum/role.enum";
import { AuthGuard } from "../user/guards/user.guard";
import { RolesGuard } from "src/user/guards/roles.guard";
import { ConnectableObservable } from "rxjs";

@ApiTags("Courses")
@Controller("courses")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post("create")
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UserDecorator() user: UserEntity
  ) {
    return await this.courseService.create(createCourseDto, user);
  }

  @Post("join/:id")
  async joinUserToCourse(
    @Param("id") course_code: string,
    @UserDecorator() user: UserEntity
  ) {
    return await this.courseService.joinUserToCourse(course_code, user);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete("delete/:id")
  async deleteCourse(@Param("id") course_code: string) {
    await this.courseService.remove(course_code);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch("update/:id")
  async updateCourse(
    @Param("id") course_code: string,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    return await this.courseService.updateCourse(course_code, updateCourseDto);
  }

  @ApiOperation({ summary: "Get all courses" })
  @Get("all")
  async findAll(@UserDecorator("id") id: number) {
    return await this.courseService.getCourses(id);
  }

  @Get("users/:id")
  async getUsers(@Param("id") id: string) {
    return await this.courseService.getUsers(id);
  }
}
