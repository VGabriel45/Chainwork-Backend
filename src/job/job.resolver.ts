import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateJobInput, UpdateJobInput } from 'src/types/graphql';
import { JobService } from './job.service';

@Resolver('Job')
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Mutation('createJob')
  create(@Args('createJobInput') createJobInput: CreateJobInput) {
    return this.jobService.create(createJobInput);
  }

  @Query('jobs')
  findAll() {
    return this.jobService.findAll();
  }

  @Query('job')
  findOne(@Args('id') id: number) {
    return this.jobService.findOne(id);
  }

  @Mutation('updateJob')
  update(@Args('updateJobInput') updateJobInput: UpdateJobInput) {
    return this.jobService.update(updateJobInput.id, updateJobInput);
  }

  @Mutation('removeJob')
  remove(@Args('id') id: number) {
    return this.jobService.remove(id);
  }
}
