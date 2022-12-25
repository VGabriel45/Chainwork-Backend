import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse, SignupUserInput, User } from 'src/types/graphql';
import { SignupResponse } from 'src/types/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Context() context) {
    return await this.authService.login(context.user);
  }

  @Mutation(() => User)
  async signup(@Args('signupUserInput') signupUserInput: SignupUserInput) {
    const password = await bcrypt.hash(signupUserInput.password, 10);
    signupUserInput.password = password;
    return await this.authService.signup(signupUserInput);
  }
}
