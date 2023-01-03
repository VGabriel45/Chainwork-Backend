import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokensResponse, SignInResponse, SignupResponse, SignupUserInput, User } from 'src/types/graphql';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user: User = await this.userService.findOneByUsername(username);
    if(!user){
      throw new Error('User does not exist');
    }
    const passwordValid = await argon2.verify(user?.password, password);
    if (user && passwordValid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signIn(user: User): Promise<SignInResponse> {
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  async signUp(signupUserInput: SignupUserInput): Promise<SignupResponse> {
    const user = await this.userService.create(signupUserInput);
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return { user, accessToken, refreshToken};
  }

  async logout(userId: number) {
    const user = await this.userService.update(userId, {refreshToken: ''});
    return user.id;
  }

  async createTokens(userId: number, userEmail: string): Promise<{accessToken: string, refreshToken: string}> {
    const accessToken = this.jwtService.sign(
      {
        email: userEmail,
        sub: userId,
      },
      { expiresIn: '15m', secret: process.env.SECRET },
    );
    const refreshToken = this.jwtService.sign(
      {
        email: userEmail,
        sub: userId,
      },
      { expiresIn: '7d', secret: process.env.REFRESH_SECRET },
    );
    return { accessToken, refreshToken };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string): Promise<string>{
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, { refreshToken: hashedRefreshToken });
    return hashedRefreshToken;
  }

  async refreshTokens(userId: number, refreshTokenArg: string): Promise<RefreshTokensResponse
  > {
    const user = await this.userService.findOne(userId);
    
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshTokenArg,
    );
    
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
