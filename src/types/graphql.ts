
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
    roleId: number;
}

export class RefreshInput {
    refreshToken: string;
    userId: number;
}

export class CreateJobInput {
    title: string;
    description: string;
    rateMin?: Nullable<number>;
    rateMax?: Nullable<number>;
    fixedRate?: Nullable<number>;
    employerId: number;
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

export class CreateRoleInput {
    name: string;
    userId: number;
}

export class UpdateRoleInput {
    id: number;
    name?: Nullable<string>;
}

export class CreateSkillInput {
    title: string;
    jobId: number;
}

export class UpdateSkillInput {
    id: number;
    title?: Nullable<string>;
    jobId?: Nullable<number>;
}

export class CreateUserInput {
    username: string;
    password: string;
    email: string;
    roleId: number;
}

export class UpdateUserInput {
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

export class RefreshAccessTokenResponse {
    accessToken?: Nullable<string>;
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

    abstract refreshAccessToken(refreshInput: RefreshInput): Nullable<RefreshAccessTokenResponse> | Promise<Nullable<RefreshAccessTokenResponse>>;

    abstract createJob(createJobInput: CreateJobInput): Job | Promise<Job>;

    abstract updateJob(updateJobInput: UpdateJobInput): Job | Promise<Job>;

    abstract removeJob(id: number): Nullable<Job> | Promise<Nullable<Job>>;

    abstract createRole(createRoleInput: CreateRoleInput): Role | Promise<Role>;

    abstract updateRole(updateRoleInput: UpdateRoleInput): Role | Promise<Role>;

    abstract removeRole(id: number): Nullable<Role> | Promise<Nullable<Role>>;

    abstract createSkill(createSkillInput: CreateSkillInput): Skill | Promise<Skill>;

    abstract updateSkill(updateSkillInput: UpdateSkillInput): Skill | Promise<Skill>;

    abstract removeSkill(id: number): Nullable<Skill> | Promise<Nullable<Skill>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export class Job {
    id: number;
    title: string;
    description: string;
    rateMin?: Nullable<number>;
    rateMax?: Nullable<number>;
    fixedRate?: Nullable<number>;
    skills?: Nullable<Nullable<Skill>[]>;
    developer?: Nullable<User>;
    client: User;
}

export abstract class IQuery {
    abstract jobs(): Nullable<Job>[] | Promise<Nullable<Job>[]>;

    abstract job(id: number): Nullable<Job> | Promise<Nullable<Job>>;

    abstract roles(): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;

    abstract role(id: number): Nullable<Role> | Promise<Nullable<Role>>;

    abstract skills(): Nullable<Nullable<Skill>[]> | Promise<Nullable<Nullable<Skill>[]>>;

    abstract skill(id: number): Nullable<Skill> | Promise<Nullable<Skill>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract userByUsername(username: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Role {
    id: number;
    name: string;
    users: Nullable<User>[];
}

export class Skill {
    id: number;
    title: string;
    job?: Nullable<Job>;
}

export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    refreshToken?: Nullable<string>;
    clientJobs?: Nullable<Nullable<Job>[]>;
    developerJobs?: Nullable<Nullable<Job>[]>;
    roles?: Nullable<Nullable<Role>[]>;
}

type Nullable<T> = T | null;
