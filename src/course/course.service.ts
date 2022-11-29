import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserCourseEntity } from 'src/user_course/entities/usercourse.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserRole } from 'src/user_course/enum/role.enum';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(UserCourseEntity)
    private readonly userCourseRepository: Repository<UserCourseEntity>
  ) {}

  // Create course related to current user
  async create(
    createCourseDto: CreateCourseDto,
    user: UserEntity
  ): Promise<CourseEntity> {
    let newCourse = new CourseEntity();
    Object.assign(newCourse, createCourseDto);
    newCourse = await this.courseRepository.save(newCourse);

    await this.userCourseRepository
      .createQueryBuilder()
      .insert()
      .into(UserCourseEntity)
      .values([{ user_: user, course_: newCourse }])
      .execute();

    return newCourse;
  }

  // Get all courses related to current user.
  // TODO: Also get role of this user related to course
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
  // Join course by code as student
  async joinUserToCourse(course_code: string, user: UserEntity) {
    const course = await this.courseRepository.findOne({
      where: {
        id: course_code,
      },
    });
    if (!course) throw new NotFoundException('Course not found');

    let checkinUser: UserCourseEntity;
    await this.userCourseRepository
      .findOne({
        where: {
          user_: { id: user.id },
          course_: { id: course.id },
        },
      })
      .then((data) => {
        checkinUser = data;
      });
    if (checkinUser) throw new ConflictException('U already in this course');
    await this.userCourseRepository
      .createQueryBuilder()
      .insert()
      .into(UserCourseEntity)
      .values([{ role: UserRole.STUDENT, course_: course, user_: user }])
      .execute();

    return course;
  }

  async find() {
    const courses = await this.courseRepository.find();
    return courses;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  // Updates course
  // Access only for Admin
  async updateCourse(course_code: string, updateCourseDto: UpdateCourseDto) {
    const updatedCourse = await this.courseRepository
      .createQueryBuilder()
      .update<CourseEntity>(CourseEntity)
      .set(updateCourseDto)
      .where('id = :id', { id: course_code })
      .returning(['title', 'room'])
      .updateEntity(true)
      .execute();
    return updatedCourse.raw[0];
  }

  // Delete course
  // Access only for admin.
  async remove(course_code: string) {
    this.courseRepository
      .createQueryBuilder('courses')
      .delete()
      .from(CourseEntity)
      .where('id = :id', { id: course_code })
      .execute();
  }
}
