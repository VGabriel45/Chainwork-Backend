import { MinLength, MaxLength, IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';
import { UpdateUserInput } from 'src/types/graphql';

export class UpdateInput extends UpdateUserInput {
    @IsNotEmpty()
    @IsNumber()
      id?: Nullable<number>;

    @IsString()
      refreshToken?: Nullable<string>;

    @IsString()
    @MinLength(4)
    @MaxLength(30)
      username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(25)
      password: string;

    @IsString()
    @IsEmail()
      email: string;
}

type Nullable<T> = T | null;
