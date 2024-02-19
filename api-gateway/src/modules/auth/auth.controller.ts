import { Body, Controller, Post } from '@nestjs/common';
import { AuthToken, UserSignInDto } from 'src/models';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: add return type
  @Post('signin')
  async signIn(@Body() userAuth: UserSignInDto): Promise<AuthToken> {
    return this.authService.signIn(userAuth);
  }
}
