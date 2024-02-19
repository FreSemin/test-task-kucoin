// import { Prisma } from '@prisma/client';
import { User as PrismaUser } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class User implements PrismaUser {
  id: number;

  name: string;

  email: string;

  @Exclude()
  password: string;

  constructor(partial?: Partial<PrismaUser>) {
    Object.assign(this, partial);
  }
}
