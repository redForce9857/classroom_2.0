import { PartialType } from "@nestjs/swagger";
import { CreateAssignmentDto } from "./createAssignment.dto";

export class UpdateAssignmentDto extends PartialType(CreateAssignmentDto) {}
