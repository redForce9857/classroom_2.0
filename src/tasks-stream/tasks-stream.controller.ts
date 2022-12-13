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
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Task stream")
@Controller("tasks-stream")
export class TasksStreamController {
  constructor(private readonly tasksStreamService: TasksStreamService) {}

  @Post()
  create(@Body() createTasksStreamDto: CreateTasksStreamDto) {
    return this.tasksStreamService.create(createTasksStreamDto);
  }

  @Get()
  findAll() {
    return this.tasksStreamService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tasksStreamService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTasksStreamDto: UpdateTasksStreamDto
  ) {
    return this.tasksStreamService.update(+id, updateTasksStreamDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tasksStreamService.remove(+id);
  }
}
