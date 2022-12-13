import { PartialType } from "@nestjs/swagger";
import { CreateTasksStreamDto } from "./create-tasks-stream.dto";

export class UpdateTasksStreamDto extends PartialType(CreateTasksStreamDto) {}
