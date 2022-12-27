import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { GradeService } from "./grade.service";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserDecorator } from "src/user/decorator/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";

@ApiTags("Grades")
@Controller("grade")
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post(":assignment_id")
  @ApiOperation({ summary: "Поставить оценку" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        mark: {
          type: "integer",
          example: "100",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "successfully created",
  })
  @ApiBearerAuth()
  async create(
    @Body() createGradeDto: CreateGradeDto,
    @UserDecorator() user: UserEntity,
    @Param("assignment_id") ass_id: number
  ) {
    return this.gradeService.create(user, ass_id);
  }

  @Get()
  @ApiOperation({ summary: "взять все grades" })
  @ApiResponse({
    status: 200,
    description: "Пример массива",
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "уникальный id",
            example: "42",
          },
          mark: {
            type: "integer",
            description: "оценка",
            example: "69",
          },
        },
      },
    },
  })
  @ApiBearerAuth()
  async getAll() {
    return this.gradeService.findAll();
  }

  @Patch(":id")
  @ApiOperation({ summary: "изменить grade" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        mark: {
          type: "integer",
          example: "100",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "successfully edited",
  })
  @ApiBearerAuth()
  update(@Param("id") id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.update(+id, updateGradeDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "удалить grade" })
  @ApiResponse({
    status: 200,
    description: "successfully deleted",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  @ApiBearerAuth()
  remove(@Param("id") id: string) {
    return this.gradeService.remove(+id);
  }

  @Get("nigga")
  sometest() {
    return "Bekjan loh";
  }
}
