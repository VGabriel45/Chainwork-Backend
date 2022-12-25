import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobInput, UpdateJobInput } from 'src/types/graphql';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}
  create(createJobInput: CreateJobInput) {
    return this.prisma.job.create({ data: createJobInput });
  }

  findAll() {
    return this.prisma.job.findMany({ include: { user: true } });
  }

  findOne(id: number) {
    return this.prisma.job.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  update(id: number, updateJobInput: UpdateJobInput) {
    return this.prisma.job.update({ where: { id }, data: updateJobInput });
  }

  remove(id: number) {
    return this.prisma.job.delete({ where: { id } });
  }
}
