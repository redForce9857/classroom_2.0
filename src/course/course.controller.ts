import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UserEntity } from "src/user/entities/user.entity";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Roles } from "src/user/decorator/roles.decorator";
import { UserRole } from "src/user_course/enum/role.enum";
import { AuthGuard } from "../user/guards/user.guard";
import { RolesGuard } from "src/user/guards/roles.guard";
import { UserDecorator } from "../user/decorator/user.decorator";

@ApiTags("Courses")
@Controller("courses")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post("create")
  @ApiOperation({ summary: "создать course" })
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UserDecorator() user: UserEntity
  ) {
    return await this.courseService.create(createCourseDto, user);
  }

  @Post(":id/join")
  @ApiOperation({ summary: "добавить ученика в course" })
  async joinUserToCourse(
    @Param("id") course_code: string,
    @UserDecorator() user: UserEntity
  ) {
    return await this.courseService.joinUserToCourse(course_code, user);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(":id/delete")
  @ApiOperation({ summary: "удалить course" })
  async deleteCourse(@Param("id") course_code: string) {
    await this.courseService.remove(course_code);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(":id/update")
  @ApiOperation({ summary: "изменить course" })
  async updateCourse(
    @Param("id") course_code: string,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    return await this.courseService.updateCourse(course_code, updateCourseDto);
  }

  @Get("all")
  @ApiOperation({ summary: "взять все course" })
  @ApiResponse({
    status: 200,
    description: "Пример массива",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          course_code: {
            type: "string",
            description: "уникальный id",
            example: "t3qdxu",
          },
          title: {
            type: "string",
            description: "название курса",
            example: "geography",
          },
          room: {
            type: "string",
            description: "номер курса",
            example: "123",
          },
          role: {
            type: "string",
            description: "роль юзера в курсе",
            example: "ADMIN",
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  async findAll(@UserDecorator("id") id: number) {
    return await this.courseService.getCourses(id);
  }

  @Get(":id/users")
  @ApiOperation({ summary: "взять юзеров курса по id" })
  @ApiResponse({
    status: 200,
    description: "Пример массива",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          role: {
            type: "string",
            description: "роль юзера в курсе",
            example: "Admin",
          },
          display_name: {
            type: "string",
            description: "имя пользователя",
            example: "aibek",
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  async getUsers(@Param("id") course_id: string) {
    return await this.courseService.getUsers(course_id);
  }
}
