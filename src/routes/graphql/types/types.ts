import DataLoader from 'dataloader';
import { Member } from '../entities/Member/types.js';
import { Subscription, Author, User } from '../entities/User/types.js';
import { Post } from '../entities/Post/types.js';
import { Profile } from '../entities/Profile/types.js';
import { PrismaClient } from '@prisma/client';

export type Args = {
  id: string;
};

export type Loaders = {
  postsLoader: DataLoader<string, Post[]>;
  profileLoader: DataLoader<string, Profile>;
  userLoader: DataLoader<string, User>;
  userSubscribedToLoader: DataLoader<string, Author[]>;
  subscribedToUser: DataLoader<string, Subscription[]>;
  memeberTypeLoader: DataLoader<string, Member>;
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
