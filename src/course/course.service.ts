import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CourseEntity } from "./entities/course.entity";

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<CourseEntity> {
    const newCourse = new CourseEntity();
    Object.assign(newCourse, createCourseDto); //мы перезаписываем все поля либо добавляем новые из createUserDto в newUser
    return await this.courseRepository.save(newCourse); //сохр нового пользователя внути бд
    // return 'This action adds a new course';
  }

  findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({ where: { id } });
    return course;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepository.update(id, updateCourseDto);
  }

  archive(id: number) {
    return `This action removes a #${id} course`;
  }
}
