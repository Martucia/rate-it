import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Participant } from './entities/participant.entity';
import { MailModule } from 'src/mail/mail.module';
import { Invitation } from './entities/invitation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Participant, Invitation]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: '30d' }
      }),
      inject: [ConfigService]
    }),
    MailModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule { }
