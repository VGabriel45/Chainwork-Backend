import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupUserInput, User } from 'src/types/graphql';
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

  async login(user: User) {
    return {
      user,
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
    };
  }

  async signup(signupUserInput: SignupUserInput) {
    return this.userService.create(signupUserInput);
  }
}
