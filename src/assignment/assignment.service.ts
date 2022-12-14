import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseEntity } from "src/course/entities/course.entity";
import { GradeEntity } from "src/grade/entities/grade.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateAssignmentDto } from "./dto/createAssignment.dto";
import { UpdateAssignmentDto } from "./dto/updateAssignment.dto";
import { AssignmentEntity } from "./entities/assignment.entity";
import { AddUserAssignmentDto } from "../user/dto/addUserAssignment.dto";
@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private readonly assignmentRepo: Repository<AssignmentEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepo: Repository<CourseEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(GradeEntity)
    private readonly gradeRepo: Repository<GradeEntity>
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
    await this.assignmentRepo
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

  async addUser(addUserAssignmentDto: AddUserAssignmentDto) {
    const result = [];
    const users_id = addUserAssignmentDto.users_id;
    const assignment_id = addUserAssignmentDto.assignment_id;

    for (const user_id in users_id) {
      const user = await this.userRepo.findOne({
        where: { id: Number(user_id) },
      });

      const assignment = await this.assignmentRepo.findOne({
        where: { id: assignment_id },
      });

      assignment.users_.push(user);
      await this.assignmentRepo.save(assignment);

      const assignmentAfterPush = await this.assignmentRepo.findOne({
        where: { id: assignment_id },
      });

      const grade = new GradeEntity();
      grade.assignment_ = assignment;
      grade.user_ = user;

      await this.gradeRepo.save(grade);

      result.push(assignmentAfterPush);
    }
    return result;
  }
}
