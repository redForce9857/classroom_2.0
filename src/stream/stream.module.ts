import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamEntity } from './entities/stream.entity';
import { StreamController } from './stream.controller';
import { StreamService } from './stream.service';

@Module({
  imports: [TypeOrmModule.forFeature([StreamEntity])],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}
