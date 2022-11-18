import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FindQuery } from 'src/utils/decorators';
import { calcSkip, QueryDto } from 'src/utils/query.dto';
import { AssignmentService } from './assignment.service';

@Controller("assignments")
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}
   
 
  @Get("getAll")
  @ApiOperation({ summary: "Get all assignments" })
  async findAll() {
  return this.assignmentService.find()
  }
}
