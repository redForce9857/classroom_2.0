import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UserEntity } from "src/user/entities/user.entity";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { AuthGuard } from "../user/guards/user.guard";
import { UserDecorator } from "../user/decorator/user.decorator";

@ApiTags("Courses")
@Controller("courses")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post("create")
  @ApiOperation({ summary: "создать course" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Название курса",
          example: "курс 1",
        },
        room: {
          type: "string",
          description: "Аудитория",
          example: "315",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "successfully",
    schema: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          description: "id",
          example: "42",
        },
        title: {
          type: "string",
          description: "Название курса",
          example: "курс 1",
        },
        room: {
          type: "string",
          description: "Аудитория",
          example: "315",
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UserDecorator() user: UserEntity
  ) {
    return await this.courseService.create(createCourseDto, user);
  }

  @Post(":id/join")
  @ApiOperation({ summary: "добавить ученика в course" })
  @ApiResponse({
    status: 201,
    description: "successfully",
    schema: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          description: "id",
          example: "42",
        },
        title: {
          type: "string",
          description: "Название курса",
          example: "курс 1",
        },
        room: {
          type: "string",
          description: "Аудитория",
          example: "315",
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async joinUserToCourse(
    @Param("id") course_code: string,
    @UserDecorator() user: UserEntity
  ) {
    return await this.courseService.joinUserToCourse(course_code, user);
  }

  @UseGuards(AuthGuard)
  @Delete(":id/delete")
  @ApiOperation({ summary: "удалить course" })
  @ApiResponse({
    status: 200,
    description: "successfully deleted",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiBearerAuth()
  async deleteCourse(@Param("id") course_code: string) {
    await this.courseService.remove(course_code);
  }

  @UseGuards(AuthGuard)
  @Patch(":id/update")
  @ApiOperation({ summary: "изменить course" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Название курса",
          example: "курс 1",
        },
        room: {
          type: "string",
          description: "Аудитория",
          example: "315",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Успешно",
    schema: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          description: "id",
          example: "42",
        },
        title: {
          type: "string",
          description: "Название курса",
          example: "курс 1",
        },
        room: {
          type: "string",
          description: "Аудитория",
          example: "315",
        },
      },
    },
  })
  @ApiBearerAuth()
  async updateCourse(
    @Param("id") course_code: string,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    return await this.courseService.updateCourse(course_code, updateCourseDto);
  }

  @Get("all")
  @ApiOperation({ summary: "взять все course" })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "взять юзеров курса по id" })
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    type: "string",
    description: "enter unique id",
    required: true,
  })
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
