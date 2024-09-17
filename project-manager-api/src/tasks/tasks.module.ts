import { Module } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Project } from 'src/projects/entities/projects.entity';

@Module({
  imports: [ProjectsModule, UsersModule, TypeOrmModule.forFeature([Task, User, Project])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }
