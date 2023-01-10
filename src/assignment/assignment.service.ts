import { Injectable } from "@nestjs/common";
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
    return await this.assignmentRepo.find({
      select: {
        topic: true,
        description: true,
        theme: true,
        time: true,
        deadline: true,
      },
      relations: { user_: true, course_: true },
      where: {
        course_: { id: course_code },
      },
    });
  }

  async create(
    createAssignmentDto: CreateAssignmentDto,
    id: string,
    user: UserEntity
  ): Promise<AssignmentEntity> {
    const current_course = await this.courseRepo.findOneBy({ id: id });
    let newAssignment = new AssignmentEntity();
    Object.assign(newAssignment, createAssignmentDto, {
      course_: current_course,
      user_: user,
    });

    newAssignment = await this.assignmentRepo.save(newAssignment);
    return newAssignment;
  }

  async delete(ass_id: number) {
    await this.assignmentRepo.delete({
      id: ass_id,
    });

    return "successfully deleted";
  }

  async update(ass_id: number, updateAssignmentDto: UpdateAssignmentDto) {
    // const updatedCourse = await this.assignmentRepo
    //   .createQueryBuilder()
    //   .update<AssignmentEntity>(AssignmentEntity)
    //   .set(updateAssignmentDto)
    //   .where("id = :id", { id: ass_id })
    //   .returning(["topic", "description", "theme", "id", "time"])
    //   .updateEntity(true)
    //   .execute();
    return await this.assignmentRepo.update(
      { id: ass_id },
      updateAssignmentDto
    );
  }

  async addUser(addUserAssignmentDto: AddUserAssignmentDto) {
    const result = [];
    const { users_id, assignment_id } = addUserAssignmentDto;
    const assignment = await this.assignmentRepo.findOne({
      where: { id: assignment_id },
      relations: { users_: true },
    });

    for (let i = 0; i < users_id.length; i++) {
      const user = await this.userRepo.findOne({
        where: { id: users_id[i] },
      });

      assignment.users_.push(user);
      await this.assignmentRepo.save(assignment);

      const assignmentAfterPush = await this.assignmentRepo.findOne({
        where: { id: assignment_id },
      });

      const grade = new GradeEntity();
      grade.assignment_ = assignment;
      grade.user_ = user;
      grade.mark = 0;

      await this.gradeRepo.save(grade);

      result.push(assignmentAfterPush);
    }
    return result;
  }
}
