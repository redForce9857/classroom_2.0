import { CourseEntity } from "src/course/entities/course.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enum/role.enum";


@Entity({name: 'user_course_middle_table'})
export class UserCourseEntity{

	@PrimaryGeneratedColumn()
	id: string;

	@ManyToOne(() => CourseEntity, (course) => course.sections)
	course: CourseEntity

	@ManyToOne(() => UserEntity, (user) => user.users)
	user: UserEntity

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.TEACHER
	})
	role: UserRole
}