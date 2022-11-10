import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
