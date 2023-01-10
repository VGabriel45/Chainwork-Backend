import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshAccessTokenResponse, SignInResponse, SignupResponse, SignupUserInput, User } from 'src/types/graphql';
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
      { expiresIn: 15, secret: process.env.SECRET },
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

  async createAccessToken(userId: number, userEmail: string): Promise<string> {
    const accessToken = this.jwtService.sign(
      {
        email: userEmail,
        sub: userId,
      },
      { expiresIn: 15, secret: process.env.SECRET },
    );
    return accessToken;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string): Promise<string>{
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, { refreshToken: hashedRefreshToken });
    return hashedRefreshToken;
  }

  async refreshAccessToken(userId: number, refreshTokenArg: string): Promise<RefreshAccessTokenResponse> {
    const user = await this.userService.findOne(userId);
    
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshTokenArg,
    );
    console.log(refreshTokenMatches);
    
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const newAccessToken = await this.createAccessToken(
      user.id,
      user.email,
    );
    return {accessToken: newAccessToken};
  }
}
