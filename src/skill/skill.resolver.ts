import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateSkillInput, UpdateSkillInput } from 'src/types/graphql';
import { SkillService } from './skill.service';

@Resolver('Skill')
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Mutation('createSkill')
  create(@Args('createSkillInput') createSkillInput: CreateSkillInput) {
    return this.skillService.create(createSkillInput);
  }

  @Query('skills')
  findAll() {
    return this.skillService.findAll();
  }

  @Query('skill')
  findOne(@Args('id') id: number) {
    return this.skillService.findOne(id);
  }

  @Mutation('updateSkill')
  update(@Args('updateSkillInput') updateSkillInput: UpdateSkillInput) {
    return this.skillService.update(updateSkillInput.id, updateSkillInput);
  }

  @Mutation('removeSkill')
  remove(@Args('id') id: number) {
    return this.skillService.remove(id);
  }
}
