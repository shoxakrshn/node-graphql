import { Args } from '../../types/types.js';

export type User = {
  id: string;
  name: string;
  balance: number;
};

export type CreateUser = {
  dto: Omit<User, 'id'>;
};

export type ChangeUser = CreateUser & Args;

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
