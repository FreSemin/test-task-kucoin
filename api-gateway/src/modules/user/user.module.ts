import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDoesNotExistConstraint } from './validation/user-does-not-exist.constraint';

@Module({
  providers: [UserService, UserDoesNotExistConstraint],
  controllers: [UserController],
})
export class UserModule {}
