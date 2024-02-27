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

export type Profile = {
  id: string;
  isMake: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: MemberTypeId;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};
