import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto, User } from 'src/models';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends PrismaClient {
  async create(createUserDto: CreateUserDto): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { retypedPassword, password, ...userData } = createUserDto;

    const user = await this.user.create({
      data: {
        ...userData,
        password: await bcrypt.hash(password, 10),
      },
    });

    return new User(user);
  }
}
