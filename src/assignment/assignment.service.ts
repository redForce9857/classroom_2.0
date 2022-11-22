import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignmentEntity } from './entities/assignment.entity';
@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private readonly assignmentRepo: Repository<AssignmentEntity>
  ) {}

  async find() {
    const assignments = await this.assignmentRepo.find();
    return assignments;
  }
}
