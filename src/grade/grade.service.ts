import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { GradeEntity } from "./entities/grade.entity";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { AssignmentEntity } from "src/assignment/entities/assignment.entity";

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly gradesRepo: Repository<GradeEntity>,
    @InjectRepository(AssignmentEntity)
    private readonly assignmentRepo: Repository<AssignmentEntity>
  ) {}

  async create(
    user: UserEntity,
    ass_id: number,
    createGradeDto: CreateGradeDto
  ) {
    const assignment = await this.assignmentRepo.findOne({
      where: { id: ass_id },
    });

    if (createGradeDto.mark > assignment.maxGrade)
      throw new ConflictException("Оценка выше максимального уровня");

    if (createGradeDto.mark < 0)
      throw new ConflictException("Оценка ниже минимального уровня");

    const grade_exists = await this.gradesRepo.find({
      where: { user_: { id: user.id }, assignment_: { id: ass_id } },
    });
    if (grade_exists.length != 0)
      throw new ConflictException("Оценка уже выставлена");
    await this.gradesRepo.save([
      { mark: createGradeDto.mark, user_: user, assignment_: { id: ass_id } },
    ]);

    return "successfully created";
  }

  async findAll() {
    return await this.gradesRepo.find({
      relations: { user_: true, assignment_: true },
    });
  }

  async findAllOfUser(user: UserEntity) {
    return await this.gradesRepo.find({
      relations: { assignment_: true },
      where: { user_: { id: user.id } },
    });
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    return await this.gradesRepo.update(id, updateGradeDto);
  }
}
