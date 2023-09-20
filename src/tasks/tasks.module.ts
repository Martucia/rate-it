import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: '30d' }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule { }
