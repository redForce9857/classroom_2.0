import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { Repository } from 'typeorm/repository/Repository';

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
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
