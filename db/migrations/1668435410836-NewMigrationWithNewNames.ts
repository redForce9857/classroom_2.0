import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrationWithNewNames1668435410836
  implements MigrationInterface
{
  name = "NewMigrationWithNewNames1668435410836";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task_stream" ("id" SERIAL NOT NULL, "topic" character varying NOT NULL, "courseId" character varying, CONSTRAINT "PK_4821bd26e4a29e802870500721b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."roles_role_enum" AS ENUM('TEACHER', 'STUDENT', 'ADMIN')`
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "role" "public"."roles_role_enum" NOT NULL DEFAULT 'TEACHER', "courseId" text array DEFAULT '{}', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "courses" ("id" character varying NOT NULL, "title" character varying NOT NULL, "room" character varying, "rolesIdId" integer, CONSTRAINT "REL_e1b54b57e43392a549cc89393b" UNIQUE ("rolesIdId"), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "assignments" ("id" SERIAL NOT NULL, "topic" character varying NOT NULL, "link" character varying NOT NULL DEFAULT '', "allStudents" boolean NOT NULL DEFAULT true, "gradeId" boolean NOT NULL, "courseId" character varying, CONSTRAINT "PK_c54ca359535e0012b04dcbd80ee" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "displayName" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "task_stream" ADD CONSTRAINT "FK_0474f256095a4a3cc256a0652c8" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_e1b54b57e43392a549cc89393bd" FOREIGN KEY ("rolesIdId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "assignments" ADD CONSTRAINT "FK_9e5684667ea189ade0fc79fa4f1" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "assignments" DROP CONSTRAINT "FK_9e5684667ea189ade0fc79fa4f1"`
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_e1b54b57e43392a549cc89393bd"`
    );
    await queryRunner.query(
      `ALTER TABLE "task_stream" DROP CONSTRAINT "FK_0474f256095a4a3cc256a0652c8"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "assignments"`);
    await queryRunner.query(`DROP TABLE "courses"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TYPE "public"."roles_role_enum"`);
    await queryRunner.query(`DROP TABLE "task_stream"`);
  }
}
