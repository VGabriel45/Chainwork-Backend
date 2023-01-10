import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSkillInput, UpdateSkillInput } from 'src/types/graphql';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService){}
  
  create(createSkillInput: CreateSkillInput) {
    return this.prisma.skill.create({data: createSkillInput});
  }

  findAll() {
    return this.prisma.skill.findMany({include: {job: {include: {developer: true}}}});
  }

  findOne(id: number) {
    return this.prisma.skill.findUnique({where: {id}, include: {job: true}});
  }

  update(id: number, updateSkillInput: UpdateSkillInput) {
    return this.prisma.skill.update({where: {id}, data: updateSkillInput});
  }

  remove(id: number) {
    return this.prisma.skill.delete({where: {id}});
  }
}
