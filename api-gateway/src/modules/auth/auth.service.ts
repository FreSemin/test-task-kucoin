import { Injectable } from '@nestjs/common';
import { UserAuth } from 'src/models';

@Injectable()
export class AuthService {
  async signin(userAuth: UserAuth) {
    // TODO: find user by email
    // check passwords
    // generate token
    return userAuth;
  }
}
