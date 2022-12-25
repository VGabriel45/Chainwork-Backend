
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginUserInput {
    username: string;
    password: string;
}

export class SignupUserInput {
    username: string;
    password: string;
    email: string;
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
    id: number;
    username?: Nullable<string>;
    password?: Nullable<string>;
    email?: Nullable<string>;
}

export class LoginResponse {
    user: User;
    access_token: string;
}

export class SignupResponse {
    userId?: Nullable<number>;
}

export class JwtPayload {
    username: string;
    sub: number;
    iat: number;
    exp: number;
}

export abstract class IMutation {
    abstract login(loginUserInput: LoginUserInput): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;

    abstract signup(signupUserInput: SignupUserInput): Nullable<User> | Promise<Nullable<User>>;

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
    username: string;
    password?: Nullable<string>;
    email: string;
    jobs: Job[];
}

type Nullable<T> = T | null;
