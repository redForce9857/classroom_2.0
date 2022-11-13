import { Controller, Get } from '@nestjs/common';
import { AssignmentService } from './assignment.service';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}
  @Get()
  async finfAll(): Promise<any> {
    return await this.assignmentService.findAll();
  }
}
