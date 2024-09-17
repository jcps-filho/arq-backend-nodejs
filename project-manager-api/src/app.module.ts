import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmConfig } from './modules/config/typeorm/typeorm.module';
import { PaginationModule } from './modules/pagination/pagination.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './modules/auth/auth.module';
import * as redisStore from "cache-manager-redis-store";
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardService } from './modules/auth/auth-guard/auth-guard.service';

@Module({
  imports: [
    ProjectsModule,
    UsersModule,
    TasksModule,
    TypeOrmConfig,
    PaginationModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuardService,
    },
  ],
})
export class AppModule { }
