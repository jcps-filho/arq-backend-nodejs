import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmConfig } from './modules/config/typeorm/typeorm.module';
import { PaginationModule } from './modules/pagination/pagination.module';

@Module({
  imports: [ProjectsModule, UsersModule, TasksModule, TypeOrmConfig, PaginationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
