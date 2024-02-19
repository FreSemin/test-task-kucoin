import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './input/create-user.dto';
import { User } from 'src/models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO: hide password from response
  // TODO: Send created token
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }
}
