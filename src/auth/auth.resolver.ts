import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { RefreshInput, SignInResponse, SignupResponse } from 'src/types/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import * as bcrypt from 'bcrypt';
import { SignupInput } from './dto/signup-input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignInResponse)
  @UseGuards(GqlAuthGuard)
  async signIn(@Context() context) {
    return await this.authService.signIn(context.user);
  }

  @Mutation(() => SignupResponse)
  async signUp(@Args('signUpUserInput') signUpUserInput: SignupInput) {
    const password = await bcrypt.hash(signUpUserInput.password, 10);
    signUpUserInput.password = password;
    return await this.authService.signUp(signUpUserInput);
  }

  @Mutation(() => Number)
  async logout(@Args('userId') userId: number) {
    return await this.authService.logout(userId);
  }

  @Mutation(() => String)
  async refresh(@Args('refreshInput') refreshInput: RefreshInput) {
    const newRefreshToken = await this.authService.updateRefreshToken(refreshInput.userId, refreshInput.refreshToken);
    return newRefreshToken;
  }
}
