import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/user/decorators/user.decorator';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(UserCourseEntity)
    private readonly userCourseRepository: Repository<UserCourseEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<CourseEntity> {
    const newCourse = new CourseEntity();
    Object.assign(newCourse, createCourseDto);
    return await this.courseRepository.save(newCourse);
  }

  // Get all courses related to current user.
  async getCourses(currentUserId: number) {
    const coursesArr: object[] = [];
    const courses = this.userCourseRepository
      .find({
        relations: {
          course_: true,
        },
        select: {
          course_: { id: true, title: true, room: true },
        },
        where: { user_: { id: currentUserId } },
      })
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          const course: object = {
            course_code: data[i].course_.id,
            title: data[i].course_.title,
            room: data[i].course_.room,
          };
          coursesArr.push(course);
        }
        return coursesArr;
      });

    return courses;
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
