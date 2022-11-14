import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { generator } from "../idGen";

@Entity({name: 'roles'})
export class RolesEntity {
	
	@PrimaryGeneratedColumn()
	id:string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.TEACHER
	})
	role: UserRole

	@Column()
	courseId: [];
}
