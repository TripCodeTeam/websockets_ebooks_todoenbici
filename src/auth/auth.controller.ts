import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async testAuth() {
    return { message: 'Hola' };
  }

  // Endpoint para login
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(user);
  }
}
