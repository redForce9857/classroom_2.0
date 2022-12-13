import { Injectable } from "@nestjs/common";
import { CreateTasksStreamDto } from "./dto/create-tasks-stream.dto";
import { UpdateTasksStreamDto } from "./dto/update-tasks-stream.dto";

@Injectable()
export class TasksStreamService {
  create(createTasksStreamDto: CreateTasksStreamDto) {
    return `This action adds a new tasksStream ${createTasksStreamDto}`;
  }

  findAll() {
    return `This action returns all tasksStream`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tasksStream`;
  }

  update(id: number, updateTasksStreamDto: UpdateTasksStreamDto) {
    return `This action updates a #${updateTasksStreamDto} tasksStream`;
  }

  remove(id: number) {
    return `This action removes a #${id} tasksStream`;
  }
}
