import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enum/role.enum";

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

	@Column({
		type: "text",
		array: true,
		default: [],
		nullable: true
	 })
	courseId?: any[];
}
