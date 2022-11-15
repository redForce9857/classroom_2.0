import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { GradeEntity } from "./entities/grade.entity";

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly gradesRepo: Repository<GradeEntity>
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    return this.gradesRepo.save(createGradeDto);
  }

  async findAll() {
    return this.gradesRepo.find();
  }
  
  update(id: number, updateGradeDto: UpdateGradeDto) {
    return this.gradesRepo.update(id, updateGradeDto);
  }

  remove(id: number) {
    return this.gradesRepo.delete(id);
  }
}
