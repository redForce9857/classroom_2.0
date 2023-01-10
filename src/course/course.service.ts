import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseEntity } from "./entities/course.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { UserCourseEntity } from "src/user_course/entities/usercourse.entity";
import { Repository } from "typeorm";
import { UserRole } from "src/user_course/enum/role.enum";

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
    if (!createCourseDto.room || !createCourseDto.title)
      throw new ConflictException("one of the parameters was not passed");

    const course = await this.courseRepository.findOne({
      where: { title: createCourseDto.title },
    });

    if (course) throw new ConflictException("Course already exist");

    createCourseDto.creator_ = user;
    let newCourse = new CourseEntity();
    Object.assign(newCourse, createCourseDto);
    newCourse = await this.courseRepository.save(newCourse);

    await this.userCourseRepository.save([{ user_: user, course_: newCourse }]);

    // await this.userCourseRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(UserCourseEntity)
    //   .values([{ user_: user, course_: newCourse }])
    //   .execute();

    return newCourse;
  }

  async getCourses(currentUserId: number) {
    const coursesArr: object[] = [];
    await this.userCourseRepository
      .find({
        relations: {
          course_: true,
          user_: true,
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
            role: data[i].role,
          };
          coursesArr.push(course);
        }
      });

    return coursesArr;
  }
  // Join course by code as student
  async joinUserToCourse(course_code: string, user: UserEntity) {
    const course = await this.courseRepository.findOne({
      where: {
        id: course_code,
      },
    });
    if (!course) throw new NotFoundException("Course not found");

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

    if (checkinUser) throw new ConflictException("User already in this course");

    await this.userCourseRepository.save([
      { role: UserRole.STUDENT, course_: course, user_: user },
    ]);

    // await this.userCourseRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(UserCourseEntity)
    //   .values([{ role: UserRole.STUDENT, course_: course, user_: user }])
    //   .execute();

    return course;
  }

  async find() {
    return await this.courseRepository.find({
      relations: { course_: true, creator_: true },
    });
  }

  async findOne(id: string) {
    return await this.courseRepository.findOne({
      where: { id: id },
      relations: { course_: true, creator_: true },
    });
  }

  async updateCourse(course_code: string, updateCourseDto: UpdateCourseDto) {
    if (!updateCourseDto.room || !updateCourseDto.title)
      throw new ConflictException("one of the parameters was not passed");

    // const updatedCourse = await this.courseRepository
    //   .createQueryBuilder()
    //   .update<CourseEntity>(CourseEntity)
    //   .set(updateCourseDto)
    //   .where("id = :id", { id: course_code })
    //   .returning(["title", "room"])
    //   .updateEntity(true)
    //   .execute();

    return await this.courseRepository.update(
      { id: course_code },
      updateCourseDto
    );
  }

  async remove(course_code: string) {
    if (!course_code) throw new ConflictException("parameter was not passed");

    await this.courseRepository.delete({
      id: course_code,
    });

    // await this.courseRepository
    //   .createQueryBuilder("courses")
    //   .delete()
    //   .from(CourseEntity)
    //   .where("id = :id", { id: course_code })
    //   .execute();

    return "successfully deleted";
  }

  async getUsers(id: string) {
    if (!id) throw new ConflictException("parameter was not passed");

    return await this.userCourseRepository
      .find({
        relations: { user_: true },
        select: { user_: { display_name: true }, role: true },
        where: { course_: { id: id } },
      })
      .then((unparsed_users) => {
        const parsed_users = [];
        for (const user of unparsed_users) {
          parsed_users.push({
            role: user.role,
            display_name: user.user_.display_name,
          });
        }
        return parsed_users;
      });
  }
}
