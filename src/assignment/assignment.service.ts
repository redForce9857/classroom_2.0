import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAssignmentDto } from "./dto/createAssignment.dto";
import { UpdateAssignmentDto } from "./dto/updateAssignment.dto";
import { AssignmentEntity } from "./entities/assignment.entity";
@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private readonly assignmentRepo: Repository<AssignmentEntity>
  ) {}

  // TODO: Add comments count
  async find(course_code: string) {
    const assignments = await this.assignmentRepo.find({
      select: {
        topic: true,
        description: true,
        theme: true,
        time: true,
        deadline: true,
      },
      where: {
        course_: { id: course_code },
      },
    });
    console.log(assignments);
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
      .createQueryBuilder("courses")
      .delete()
      .from(AssignmentEntity)
      .where("id = :id", { id: ass_id })
      .execute();

    return HttpStatus.OK;
  }

  async update(ass_id: number, updateAssignmentDto: UpdateAssignmentDto) {
    const updatedCourse = await this.assignmentRepo
      .createQueryBuilder()
      .update<AssignmentEntity>(AssignmentEntity)
      .set(updateAssignmentDto)
      .where("id = :id", { id: ass_id })
      .returning(["topic", "description", "theme", "id", "time"])
      .updateEntity(true)
      .execute();
    return updatedCourse.raw[0];
  }
}
