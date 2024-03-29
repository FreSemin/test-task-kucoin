import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto, User } from 'src/models';
import * as bcrypt from 'bcrypt';
import { USER_NOT_FOUND_EXCEPTION } from 'src/constants';

@Injectable()
export class UserService extends PrismaClient {
  async findOneByEmail(email: string): Promise<User> {
    const user: User | null = await this.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_EXCEPTION(email));
    }

    return user;
  }

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
