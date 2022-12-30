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

    // await this.gradesRepo
    //   .createQueryBuilder()
    //   .insert()
    //   .into(GradeEntity)
    //   .values([{ mark: 0, user_: user, assignment_: { id: ass_id } }])
    //   .execute();

    return "successfully created";
  }

  async findAll() {
    return this.gradesRepo.find();
  }

  update(id: number, updateGradeDto: UpdateGradeDto) {
    return this.gradesRepo.update(id, updateGradeDto);
  }

  remove(id: number) {
    this.gradesRepo.delete(id);

    return "successfully deleted";
  }
}
