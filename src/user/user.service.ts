import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput, Job, UpdateUserInput, User } from 'src/types/graphql';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    return this.prisma.user.create({ data: createUserInput });
  }

  findAll(): Promise<any[]> {
    return this.prisma.user.findMany({});
  }

  findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: updateUserInput });
  }

  remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
