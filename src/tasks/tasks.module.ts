import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './../auth/auth.module';
import { TaskRespository } from './task.respository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TaskRespository]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
