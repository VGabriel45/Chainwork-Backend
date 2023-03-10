import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SignupInput } from './types/SignupInput';
import { UpdateInput } from './types/UpdateInput';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: SignupInput) {
    return this.userService.create(createUserInput);
  }

  @Query('users')
  // @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  @Query('userByUsername')
  findOneByUsername(@Args('username') username: string) {
    return this.userService.findOneByUsername(username);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
