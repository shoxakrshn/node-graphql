import { MemberTypeId } from '../../../member-types/schemas.js';

export type Args = {
  id: string;
};

export type Member = {
  id: MemberTypeId;
  discount: number;
  postsLimitPerMonth: number;
};

export type User = {
  id: string;
  name: string;
  balance: number;
};

export type CreateUser = {
  dto: Omit<User, 'id'>;
};

export type ChangeUser = CreateUser & Args;

export type Profile = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: MemberTypeId;
};

export type CreateProfile = {
  dto: Omit<Profile, 'id'>;
};

export type ChangeProfile = Args & {
  dto: Omit<Profile, 'id, userId'>;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export type CreatePost = {
  dto: Omit<Post, 'id'>;
};

export type ChangePost = CreatePost & Args;
