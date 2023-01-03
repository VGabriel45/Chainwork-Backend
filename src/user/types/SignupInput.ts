import { MinLength, MaxLength, IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { SignupUserInput } from 'src/types/graphql';

export class SignupInput extends SignupUserInput {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(30)
      username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(25)
      password: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
      email: string;
}


