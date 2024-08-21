import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeormModule } from './modules/config/typeorm/typeorm.module';

@Module({
  imports: [ProjectsModule, UsersModule, TasksModule, TypeormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
