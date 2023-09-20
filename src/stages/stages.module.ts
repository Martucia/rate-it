import { Module } from '@nestjs/common';
import { StagesService } from './stages.service';
import { StagesController } from './stages.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Stage } from './entities/stage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stage]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: '30d' }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [StagesController],
  providers: [StagesService],
})
export class StagesModule { }
