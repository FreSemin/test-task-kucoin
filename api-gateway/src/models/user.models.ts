// import { Prisma } from '@prisma/client';
import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  id: number;
  name: string;
  email: string;
  password: string;

  constructor(partial?: Partial<PrismaUser>) {
    Object.assign(this, partial);
  }
}
