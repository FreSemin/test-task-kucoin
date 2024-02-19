import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './input/create-user.dto';
import { User } from 'src/models';
import { hashValue } from 'src/utils';

@Injectable()
export class UserService extends PrismaClient {
  async create(createUserDto: CreateUserDto): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { retypedPassword, password, ...userData } = createUserDto;

    const user = await this.user.create({
      data: {
        ...userData,
        password: hashValue(password),
      },
    });

    return new User(user);
  }
}
