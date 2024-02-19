import { Body, Controller, Post } from '@nestjs/common';
import { UserAuth } from 'src/models';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: add return type
  @Post('signin')
  async signIn(@Body() userAuth: UserAuth) {
    return this.authService.signin(userAuth);
  }
}
