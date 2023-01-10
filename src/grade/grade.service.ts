import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { GradeEntity } from "./entities/grade.entity";

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly gradesRepo: Repository<GradeEntity>
  ) {}

  async create(user: UserEntity, ass_id: number) {
    const grade_exists = await this.gradesRepo.find({
      where: { user_: { id: user.id }, assignment_: { id: ass_id } },
    });
    if (grade_exists.length != 0) throw new Error("Оценка уже выставлена");
    await this.gradesRepo.save([
      { mark: 0, user_: user, assignment_: { id: ass_id } },
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
    await this.gradesRepo.delete(id);

    return "successfully deleted";
  }
}
