import { Module } from '@nestjs/common';
import { TasksStreamService } from './tasks-stream.service';
import { TasksStreamController } from './tasks-stream.controller';

@Module({
  controllers: [TasksStreamController],
  providers: [TasksStreamService]
})
export class TasksStreamModule {}
