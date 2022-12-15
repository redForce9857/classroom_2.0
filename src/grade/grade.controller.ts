import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { GradeService } from "./grade.service";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserDecorator } from "src/user/decorator/user.decorator";
import { UserEntity } from "src/user/entities/user.entity";

@ApiTags("Grades")
@Controller("grade")
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post(":assignment_id")
  @ApiOperation({ summary: "Поставить оценку" })
  async create(
    @Body() createGradeDto: CreateGradeDto,
    @UserDecorator() user: UserEntity,
    @Param("assignment_id") ass_id: number
  ) {
    return this.gradeService.create(user, ass_id);
  }

  @Get()
  async getAll() {
    return this.gradeService.findAll();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.update(+id, updateGradeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.gradeService.remove(+id);
  }
}
