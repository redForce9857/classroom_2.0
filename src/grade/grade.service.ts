import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { GradeEntity } from "./entities/grade.entity";
import { CreateGradeDto } from "./dto/create-grade.dto";

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly gradesRepo: Repository<GradeEntity>
  ) {}

  async create(
    user: UserEntity,
    ass_id: number,
    createGradeDto: CreateGradeDto
  ) {
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

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    return await this.gradesRepo.update(id, updateGradeDto);
  }

  async remove(id: number) {
    const grade = await this.gradesRepo.findOne({ where: { id: id } });

    if (!grade) throw new NotFoundException("Grade not found");

    await this.gradesRepo.delete(id);

    return "successfully deleted";
  }
}
