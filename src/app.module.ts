import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { StagesModule } from './stages/stages.module';
import { FileController } from './file/file.controller';
import { CommentsModule } from './comments/comments.module';
import { FileModule } from './file/file.module';
import { MailModule } from './mail/mail.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService]
    }),
    ProjectsModule,
    TagsModule,
    AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 30000,
      limit: 15,
    }]),
    StagesModule,
    CommentsModule,
    FileModule,
    MailModule,
    NotificationsModule,
  ],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule { }
