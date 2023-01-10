import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateRoleInput, UpdateRoleInput } from 'src/types/graphql';
import { RoleService } from './role.service';

@Resolver('Role')
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation('createRole')
  create(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.roleService.create(createRoleInput);
  }

  @Query('roles')
  findAll() {
    return this.roleService.findAll();
  }

  @Query('role')
  findOne(@Args('id') id: number) {
    return this.roleService.findOne(id);
  }

  @Mutation('updateRole')
  update(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.roleService.update(updateRoleInput.id, updateRoleInput);
  }

  @Mutation('removeRole')
  remove(@Args('id') id: number) {
    return this.roleService.remove(id);
  }
}
