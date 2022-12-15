// TODO : ADd guards depending on course role
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
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

  // Get current course assignments
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "взять assignments" })
  async findAll(@Param("id") course_id: string) {
    return await this.assignmentService.find(course_id);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post("create")
  @ApiOperation({ summary: "создать assignment" })
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
  async deleteAss(@Param("ass_id") ass_id: string) {
    return await this.assignmentService.delete(ass_id);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch("update/:ass_id")
  @ApiOperation({ summary: "изменить assignment" })
  async updateAss(
    @Param("ass_id") ass_id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto
  ) {
    return await this.assignmentService.update(ass_id, updateAssignmentDto);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Put("add")
  @ApiOperation({ summary: "добавить нового ученика в assignments" })
  async addUser(@Body() addUserAssignmentDto: AddUserAssignmentDto) {
    return await this.assignmentService.addUser(addUserAssignmentDto);
  }
}
