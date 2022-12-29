import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SignInResponse, SignupUserInput, User } from 'src/types/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignInResponse)
  @UseGuards(GqlAuthGuard)
  async signIn(@Context() context) {
    return await this.authService.signIn(context.user);
  }

  @Mutation(() => User)
  async signUp(@Args('signupUserInput') signupUserInput: SignupUserInput) {
    const password = await bcrypt.hash(signupUserInput.password, 10);
    signupUserInput.password = password;
    return await this.authService.signUp(signupUserInput);
  }

  // @Mutation(() => User)
  // async logout(@Args('signupUserInput') signupUserInput: SignupUserInput) {
  //   const password = await bcrypt.hash(signupUserInput.password, 10);
  //   signupUserInput.password = password;
  //   return await this.authService.signUp(signupUserInput);
  // }

  // @Mutation(() => User)
  // async refresh(@Args('signupUserInput') signupUserInput: SignupUserInput) {
  //   const password = await bcrypt.hash(signupUserInput.password, 10);
  //   signupUserInput.password = password;
  //   return await this.authService.signUp(signupUserInput);
  // }
}
