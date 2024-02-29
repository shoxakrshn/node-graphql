import DataLoader from 'dataloader';
import { MemberTypeId } from '../../../member-types/schemas.js';
import { FieldNode } from 'graphql';
import { PrismaClient } from '@prisma/client';

export type Args = {
  id: string;
};

export type Member = {
  id: MemberTypeId | string;
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
  memberTypeId: MemberTypeId | string;
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

type SubsId = {
  subscriberId: string;
  authorId: string;
};

type SubsType = 'userSubscribedTo' | 'subscribedToUser';

type Example = Record<SubsType, SubsId>;
export type AuthorSub = Omit<Example, 'userSubscribedTo'>;
export type subscribedToUser = Omit<Example, 'subscribedToUser'>;

export type Subscription = {
  subscribedToUser: {
    subscriberId: string;
    authorId: string;
  }[];
} & User;

export type Author = {
  userSubscribedTo: {
    subscriberId: string;
    authorId: string;
  }[];
} & User;

export type Loaders = {
  postsLoader: DataLoader<string, Post[]>;
  profileLoader: DataLoader<string, Profile>;
  userLoader: DataLoader<string, User>;
  userSubscribedToLoader: DataLoader<string, Member>;
  subscribedToUser: DataLoader<string, Subscription[]>;
  memeberTypeLoader: DataLoader<string, Author[]>;
};

export type Context = {
  prisma: PrismaClient;
  loaders: Loaders;
};

export type Context2 = {
  prisma: PrismaClient;
  buildLoader: <T>(
    prisma: PrismaClient,
    callback: CallbackType,
  ) => DataLoader<string, T | T[], string>;
};

export type CallbackType = <T>(
  dbClient: PrismaClient,
) => DataLoader.BatchLoadFn<string, T | T[] | T[][]>;
