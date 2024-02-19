import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './input/create-user.dto';
import { User } from 'src/models';

@Injectable()
export class UserService extends PrismaClient {
  async create(createUserDto: CreateUserDto): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { retypedPassword, ...userData } = createUserDto;

    return await this.user.create({
      data: userData,
    });
  }
}
