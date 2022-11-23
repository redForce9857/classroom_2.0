import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';
import dataSource from 'db/data-source';
import { Repository } from 'typeorm';
import { use } from 'passport';
import { UserRole } from 'src/user_course/enum/role.enum';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(UserCourseEntity)
    private readonly userCourseRepository: Repository<UserCourseEntity>
  ) {}

  async create(
    createCourseDto: CreateCourseDto,
    user: UserEntity
  ): Promise<CourseEntity> {
    let newCourse = this.courseRepository.create(createCourseDto);
    newCourse = await this.courseRepository.save(createCourseDto);

    await this.userCourseRepository
      .createQueryBuilder()
      .insert()
      .into(UserCourseEntity)
      .values([{ user_: user, course_: newCourse }])
      .execute();

    return newCourse;
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

  async joinUserToCourse(course_code: number, user: UserEntity) {
    const course = await this.courseRepository.findOne({
      where: {
        id: course_code,
      },
    });
    if (!course) throw new NotFoundException('Course not found');

    await this.userCourseRepository
      .createQueryBuilder()
      .insert()
      .into(UserCourseEntity)
      .values([{ role: UserRole.STUDENT, course_: course, user_: user }])
      .execute();

    return course;
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
