// TODO : ADd guards depending on course role
// choose between params an smth
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/user/decorator/roles.decorator';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { AuthGuard } from 'src/user/guards/user.guard';
import { UserRole } from 'src/user_course/enum/role.enum';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/createAssignment.dto';
import { UpdateAssignmentDto } from './dto/updateAssignment.dto';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  // Get current course assignments
  @UseGuards(AuthGuard)
  @Get('/get/:course_id')
  @ApiOperation({ summary: 'Get all assignments' })
  async findAll(@Param('course_id') course_id: string) {
    return await this.assignmentService.find(course_id);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/create/:id')
  async createAss(
    @Body() createAssignmentDto: CreateAssignmentDto,
    @Param('id') id: string
  ) {
    return await this.assignmentService.create(createAssignmentDto, id);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/delete/:ass_id')
  async deleteAss(@Param('ass_id') ass_id: string) {
    return await this.assignmentService.delete(ass_id);
  }

  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @Patch('/update/:ass_id')
  async updateAss(
    @Param('ass_id') id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto
  ) {
    return await this.assignmentService.update(id, updateAssignmentDto);
  }
}
