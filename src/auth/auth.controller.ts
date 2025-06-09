import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('ping')
  KeepServerUp() {
    return 'pong';
  }

  @Post('login')
  async login(@Body(ValidationPipe) body: CreateUserDto) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body(ValidationPipe) body: CreateUserDto) {
    return this.authService.register(body);
  }
}
