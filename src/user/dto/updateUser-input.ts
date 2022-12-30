/* eslint-disable indent */
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
    @IsNumber()
    @Field()
    id: number;

    @IsString()
    @Field()
    username: string;

    @IsString()
    @IsEmail()
    @Field()
    email: string;

    @IsString()
    @Field()
    password: string;
}
