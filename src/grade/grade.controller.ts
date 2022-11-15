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
@ApiTags("Grades")
@Controller("grade")
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  @ApiOperation({ summary: "Поставить оценку" })
  async create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradeService.create(createGradeDto);
  }

  @Get()
  async getAll(){
    return this.gradeService.findAll()
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
