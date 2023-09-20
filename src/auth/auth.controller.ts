import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @Throttle({ default: { limit: 5, ttl: 60000 } })
  @SkipThrottle()
  @Get()
  @UseGuards(JwtAuthGuard)
  async auth(@Request() req) {
    return this.authService.login(req.user);
  }
}
