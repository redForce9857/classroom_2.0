import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
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
