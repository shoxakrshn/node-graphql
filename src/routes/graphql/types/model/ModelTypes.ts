import DataLoader from 'dataloader';
import { MemberTypeId } from '../../../member-types/schemas.js';
import { FieldNode } from 'graphql';

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

export type GraphQLContext = {
  postsLoader: DataLoader<unknown, Post[], unknown>;
  profileLoader: DataLoader<unknown, Profile | undefined, unknown>;
  membersLoader: DataLoader<unknown, Member | undefined, unknown>;
  userSubscribedToLoader: DataLoader<unknown, Subscription[], unknown>;
  subscribedToUserLoader: DataLoader<unknown, Author[], unknown>;
};

export type ContextUnion =
  | DataLoader<unknown, Post[], unknown>
  | DataLoader<unknown, User | undefined, unknown>
  | DataLoader<unknown, Profile | undefined, unknown>
  | DataLoader<unknown, Member | undefined, unknown>
  | DataLoader<unknown, Subscription[], unknown>
  | DataLoader<unknown, Author[], unknown>;

export type Context = {
  dataloaders: WeakMap<readonly FieldNode[], ContextUnion>;
};
