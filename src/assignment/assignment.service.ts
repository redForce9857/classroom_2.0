import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/createAssignment.dto';
import { AssignmentEntity } from './entities/assignment.entity';
@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private readonly assignmentRepo: Repository<AssignmentEntity>
  ) {}

  async find(course_code: string) {
    const assignments = await this.assignmentRepo.find({
      select: { course_: { id: true } },
    });
    return assignments;
  }

  async create(
    createAssignmentDto: CreateAssignmentDto,
    id: string
  ): Promise<AssignmentEntity> {
    let newAssignment = new AssignmentEntity();
    Object.assign(newAssignment, createAssignmentDto, { course_: id });
    newAssignment = await this.assignmentRepo.save(newAssignment);
    // await this.assignmentRepo
    //   .createQueryBuilder()
    //   .insert()
    //   .into(AssignmentEntity)
    //   .values([
    //     {
    //       topic: createAssignmentDto.topic,
    //       description: createAssignmentDto.description,
    //       theme: createAssignmentDto.theme,
    //     },
    //   ])
    //   .execute();
    return newAssignment;
  }

  async delete(ass_id: string) {
    this.assignmentRepo
      .createQueryBuilder('courses')
      .delete()
      .from(AssignmentEntity)
      .where('id = :id', { id: ass_id })
      .execute();

    return HttpStatus.OK;
  }

  async update(ass_id: number) {}
}
