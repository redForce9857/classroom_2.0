// TODO : ADd guards depending on course role
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
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Roles } from "src/user/decorator/roles.decorator";
import { UserDecorator } from "src/user/decorator/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";
import { RolesGuard } from "src/user/guards/roles.guard";
import { AuthGuard } from "src/user/guards/user.guard";
import { UserRole } from "src/user_course/enum/role.enum";
import { AssignmentService } from "./assignment.service";
import { CreateAssignmentDto } from "./dto/createAssignment.dto";
import { UpdateAssignmentDto } from "./dto/updateAssignment.dto";
import { AddUserAssignmentDto } from "../user/dto/addUserAssignment.dto";

@ApiTags("Assignments")
@Controller("courses/:id/assignments")
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "взять assignments" })
  @ApiResponse({
    status: 200,
    description: "Пример массива",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description: "топик задания",
            example: "алгебра",
          },
          description: {
            type: "string",
            description: "описание задания",
            example: "решите уравнения при помощи...",
          },
          theme: {
            type: "string",
            description: "тема задания",
            example: "уравнения",
          },
          time: {
            type: "timestamptz",
            description: "дата создания",
            example: "2022-12-15 04:31:02.463234 +00:00",
          },
          deadline: {
            type: "timestamptz",
            description: "дата дедлайна",
            example: "2022-12-15 04:31:02.463234 +00:00",
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiBearerAuth()
  async findAll(@Param("id") course_id: string) {
    return await this.assignmentService.find(course_id);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post("create")
  @ApiOperation({ summary: "создать assignment" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description: "заголовок",
          example: "алгебра",
        },
        description: {
          type: "string",
          description: "описание",
          example: "решите то и то...",
        },
        theme: {
          type: "string",
          description: "тема задания",
          example: "уравнения",
        },
        maxGrade: {
          type: "integer",
          description: "максимальная оценка",
          example: "100",
        },
        user_: {
          type: "object",
          description: "сущность юзера",
          example: {},
        },
        course_: {
          type: "object",
          description: "сущность курса",
          example: {},
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
        user_id: {
          type: "integer",
          description: "user id",
          example: "42",
        },
        topic: {
          type: "string",
          description: "заголовок",
          example: "алгебра",
        },
        description: {
          type: "string",
          description: "описание",
          example: "решите то и то...",
        },
        theme: {
          type: "string",
          description: "тема задания",
          example: "уравнения",
        },
        link: {
          type: "string",
          description: "ссылка",
        },
        course_id: {
          type: "string",
          description: "id course",
          example: "t3qdxu",
        },
        maxGrade: {
          type: "integer",
          description: "максимальная оценка",
          example: "100",
        },
        deadline: {
          type: "timestamptz",
          description: "дата дедлайна",
          example: "2022-12-15 04:31:02.463234 +00:00",
        },
        time: {
          type: "timestamptz",
          description: "дата создания",
          example: "2022-12-15 04:31:02.463234 +00:00",
        },
        all_students: {
          type: "boolean",
          example: "true",
        },
      },
    },
  })
  @ApiBearerAuth()
  async createAss(
    @Body() createAssignmentDto: CreateAssignmentDto,
    @Param("id") id: string,
    @UserDecorator() user: UserEntity
  ) {
    return await this.assignmentService.create(createAssignmentDto, id, user);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete("delete/:ass_id")
  @ApiOperation({ summary: "удалить assignment" })
  @ApiResponse({
    status: 200,
    description: "successfully deleted",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiBearerAuth()
  async deleteAss(@Param("ass_id") ass_id: number) {
    return await this.assignmentService.delete(ass_id);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch("update/:ass_id")
  @ApiOperation({ summary: "изменить assignment" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          description: "заголовок",
          example: "алгебра",
        },
        description: {
          type: "string",
          description: "описание",
          example: "решите то и то...",
        },
        theme: {
          type: "string",
          description: "тема задания",
          example: "уравнения",
        },
        maxGrade: {
          type: "integer",
          description: "максимальная оценка",
          example: "100",
        },
        user_: {
          type: "object",
          description: "сущность юзера",
          example: {},
        },
        course_: {
          type: "object",
          description: "сущность курса",
          example: {},
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
        user_id: {
          type: "integer",
          description: "user id",
          example: "42",
        },
        topic: {
          type: "string",
          description: "заголовок",
          example: "алгебра",
        },
        description: {
          type: "string",
          description: "описание",
          example: "решите то и то...",
        },
        theme: {
          type: "string",
          description: "тема задания",
          example: "уравнения",
        },
        link: {
          type: "string",
          description: "ссылка",
        },
        course_id: {
          type: "string",
          description: "id course",
          example: "t3qdxu",
        },
        maxGrade: {
          type: "integer",
          description: "максимальная оценка",
          example: "100",
        },
        deadline: {
          type: "timestamptz",
          description: "дата дедлайна",
          example: "2022-12-15 04:31:02.463234 +00:00",
        },
        time: {
          type: "timestamptz",
          description: "дата создания",
          example: "2022-12-15 04:31:02.463234 +00:00",
        },
        all_students: {
          type: "boolean",
          example: "true",
        },
      },
    },
  })
  @ApiBearerAuth()
  async updateAss(
    @Param("ass_id") ass_id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto
  ) {
    return await this.assignmentService.update(ass_id, updateAssignmentDto);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch("add")
  @ApiOperation({ summary: "добавить нового ученика в assignments" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        users_id: {
          type: "array",
          description: "users id",
          example: [1, 2, 4],
        },
        assignment_id: {
          type: "integer",
          description: "assignment id",
          example: "42",
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
        user_id: {
          type: "integer",
          description: "user id",
          example: "42",
        },
        topic: {
          type: "string",
          description: "заголовок",
          example: "алгебра",
        },
        description: {
          type: "string",
          description: "описание",
          example: "решите то и то...",
        },
        theme: {
          type: "string",
          description: "тема задания",
          example: "уравнения",
        },
        link: {
          type: "string",
          description: "ссылка",
        },
        course_id: {
          type: "string",
          description: "id course",
          example: "t3qdxu",
        },
        maxGrade: {
          type: "integer",
          description: "максимальная оценка",
          example: "100",
        },
        deadline: {
          type: "timestamptz",
          description: "дата дедлайна",
          example: "2022-12-15 04:31:02.463234 +00:00",
        },
        time: {
          type: "timestamptz",
          description: "дата создания",
          example: "2022-12-15 04:31:02.463234 +00:00",
        },
        all_students: {
          type: "boolean",
          example: "true",
        },
      },
    },
  })
  @ApiBearerAuth()
  async addUser(@Body() addUserAssignmentDto: AddUserAssignmentDto) {
    return await this.assignmentService.addUser(addUserAssignmentDto);
  }
}
