import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserAuth } from 'src/models';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(userAuth: UserAuth) {
    // TODO: generate token
    const user: User = await this.userService.findOneByEmail(userAuth.email);

    if (!(await bcrypt.compare(userAuth.password, user.password))) {
      throw new UnauthorizedException();
    }

    return userAuth;
  }
}
