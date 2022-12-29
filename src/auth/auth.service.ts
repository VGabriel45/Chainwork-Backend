import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupResponse, SignupUserInput, User } from 'src/types/graphql';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user: User = await this.userService.findOneByUsername(username);
    const passwordValid = await bcrypt.compare(password, user?.password);
    if (user && passwordValid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signIn(user: User) {
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
    return { user, accessToken, refreshToken };
  }

  async createTokens(userId: number, userEmail: string) {
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
        accessToken: accessToken,
      },
      { expiresIn: '7d', secret: process.env.REFRESH_SECRET },
    );
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const newRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.update(userId, { refreshToken: newRefreshToken });
  }
}
