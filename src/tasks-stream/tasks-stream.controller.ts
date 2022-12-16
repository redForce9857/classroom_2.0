import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TasksStreamService } from "./tasks-stream.service";
import { CreateTasksStreamDto } from "./dto/create-tasks-stream.dto";
import { UpdateTasksStreamDto } from "./dto/update-tasks-stream.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Task stream")
@Controller("tasks-stream")
export class TasksStreamController {
  constructor(private readonly tasksStreamService: TasksStreamService) {}

  @Post()
  @ApiOperation({ summary: "создать tasksStream" })
  create(@Body() createTasksStreamDto: CreateTasksStreamDto) {
    return this.tasksStreamService.create(createTasksStreamDto);
  }

  @Get()
  @ApiOperation({ summary: "взять все tasksStream" })
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
          topic: {
            type: "string",
            description: "заголовок",
            example: "задание",
          },
        },
      },
    },
  })
  findAll() {
    return this.tasksStreamService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "взять tasksStream по id" })
  @ApiParam({
    name: "id",
    type: "integer",
    description: "enter unique id",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "Пример массива",
    schema: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          description: "уникальный id",
          example: "42",
        },
        topic: {
          type: "string",
          description: "заголовок",
          example: "задание",
        },
      },
    },
  })
  findOne(@Param("id") id: string) {
    return this.tasksStreamService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "изменить tasksStream" })
  update(
    @Param("id") id: string,
    @Body() updateTasksStreamDto: UpdateTasksStreamDto
  ) {
    return this.tasksStreamService.update(+id, updateTasksStreamDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "удалить tasksStream" })
  @ApiResponse({
    status: 200,
    description: "This action removes a tasksStream",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  remove(@Param("id") id: string) {
    return this.tasksStreamService.remove(+id);
  }
}
