import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleInput, UpdateRoleInput } from 'src/types/graphql';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService){}

  create(createRoleInput: CreateRoleInput) {
    return this.prisma.role.create({data: createRoleInput});
  }

  findAll() {
    return this.prisma.role.findMany({include: {users: true}});
  }

  findOne(id: number) {
    return this.prisma.role.findUnique({where: {id}, include: {users: true}});
  }

  update(id: number, updateRoleInput: UpdateRoleInput) {
    return this.prisma.role.update({where: {id}, data: updateRoleInput});
  }

  remove(id: number) {
    return this.prisma.role.delete({where: {id}});
  }
}
