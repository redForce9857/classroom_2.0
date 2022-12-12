import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseEntity } from "src/course/entities/course.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { UserCourseEntity } from "src/user_course/entities/usercourse.entity";
import { Repository } from "typeorm";
import { CreateAssignmentDto } from "./dto/createAssignment.dto";
import { UpdateAssignmentDto } from "./dto/updateAssignment.dto";
import { AssignmentEntity } from "./entities/assignment.entity";
@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private readonly assignmentRepo: Repository<AssignmentEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepo: Repository<CourseEntity>
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
    id: string,
    user: UserEntity
  ): Promise<AssignmentEntity> {
    const current_course = await this.courseRepo.findOneBy({ id: id });
    console.log(current_course);
    let newAssignment = new AssignmentEntity();
    Object.assign(newAssignment, createAssignmentDto, {
      course_: current_course,
      user_: user,
    });

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
