import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { RefreshInput, RefreshTokensResponse, SignInResponse, SignupResponse } from 'src/types/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import * as argon2 from 'argon2';
import { SignupInput } from 'src/user/types/SignupInput';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

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
    const password = await argon2.hash(signUpUserInput.password);
    signUpUserInput.password = password;
    return await this.authService.signUp(signUpUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Number)
  async logout(@Args('userId') userId: number) {
    return await this.authService.logout(userId);
  }

  // @UseGuards(RefreshTokenGuard)
  @Mutation(() => RefreshTokensResponse)
  async refreshToken(@Args('refreshInput') refreshInput: RefreshInput) {
    return await this.authService.refreshTokens(refreshInput.userId, refreshInput.refreshToken);
  }
}
