import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CourseEntity } from "./entities/course.entity";
import { UserCourseEntity } from "src/user_course/entities/usercourse.entity";

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<CourseEntity> {
    const newCourse = new CourseEntity();
    Object.assign(newCourse, createCourseDto);
    return await this.courseRepository.save(newCourse);
  }

  async find() {
    const courses = await this.courseRepository.find();
    return courses;
  }
}
