
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SignInUserInput {
    username: string;
    password: string;
}

export class SignupUserInput {
    username: string;
    password: string;
    email: string;
}

export class RefreshInput {
    refreshToken: string;
    userId: number;
}

export class CreateJobInput {
    title: string;
    description: string;
    rateMin: number;
    rateMax: number;
    fixedRate: number;
}

export class UpdateJobInput {
    id: number;
    title?: Nullable<string>;
    description?: Nullable<string>;
    rateMin?: Nullable<number>;
    rateMax?: Nullable<number>;
    fixedRate?: Nullable<number>;
    userId?: Nullable<number>;
}

export class CreateUserInput {
    username: string;
    password: string;
    email: string;
}

export class UpdateUserInput {
    id?: Nullable<number>;
    username?: Nullable<string>;
    password?: Nullable<string>;
    email?: Nullable<string>;
    refreshToken?: Nullable<string>;
}

export class SignInResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export class SignupResponse {
    user?: Nullable<User>;
    accessToken?: Nullable<string>;
    refreshToken?: Nullable<string>;
}

export class JwtPayload {
    username: string;
    sub: number;
    iat: number;
    exp: number;
}

export abstract class IMutation {
    abstract signIn(signInUserInput: SignInUserInput): Nullable<SignInResponse> | Promise<Nullable<SignInResponse>>;

    abstract signUp(signUpUserInput: SignupUserInput): Nullable<SignupResponse> | Promise<Nullable<SignupResponse>>;

    abstract logout(userId: number): Nullable<number> | Promise<Nullable<number>>;

    abstract refresh(refreshInput: RefreshInput): Nullable<string> | Promise<Nullable<string>>;

    abstract createJob(createJobInput: CreateJobInput): Job | Promise<Job>;

    abstract updateJob(updateJobInput: UpdateJobInput): Job | Promise<Job>;

    abstract removeJob(id: number): Nullable<Job> | Promise<Nullable<Job>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export class Job {
    id?: Nullable<number>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    rateMin?: Nullable<number>;
    rateMax?: Nullable<number>;
    fixedRate?: Nullable<number>;
    userId?: Nullable<number>;
    user?: Nullable<User>;
}

export abstract class IQuery {
    abstract jobs(): Nullable<Job>[] | Promise<Nullable<Job>[]>;

    abstract job(id: number): Nullable<Job> | Promise<Nullable<Job>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract userByUsername(username: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: number;
    username?: Nullable<string>;
    password?: Nullable<string>;
    email?: Nullable<string>;
    refreshToken?: Nullable<string>;
    jobs?: Nullable<Job[]>;
}

type Nullable<T> = T | null;
