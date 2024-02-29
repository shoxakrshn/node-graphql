import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './ProfileType.js';
import prisma from '../prisma.js';
import { PostType } from './PostType.js';
import { Context, User } from './ModelTypes.js';
import DataLoader from 'dataloader';
import { batchPostsByUserIds } from '../../loaders/postLoader.js';
import { batchProfilesByUserIds } from '../../loaders/profileLoader.js';
import { batchUserSubscribedTo } from '../../loaders/userSubscribedToLoader.js';
import { batchSubscribedToUser } from '../../loaders/subscribedToUser.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async ({ id }: User, _, context, info) => {
        const rawContext = context as Context;
        const { dataloaders } = rawContext;
        let profileLoader = dataloaders.get(info.fieldNodes);

        if (!profileLoader) {
          profileLoader = new DataLoader(batchProfilesByUserIds);
          dataloaders.set(info.fieldNodes, profileLoader);
        }

        return profileLoader?.load(id);
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, _, context, info) => {
        const rawContext = context as Context;
        const { dataloaders } = rawContext;
        let postsLoader = dataloaders.get(info.fieldNodes);
        console.log(dataloaders);
        if (!postsLoader) {
          console.log('doesnt exist');
          postsLoader = new DataLoader(batchPostsByUserIds);
          dataloaders.set(info.fieldNodes, postsLoader);
        }

        return postsLoader?.load(id);
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, _, context, info) => {
        const rawContext = context as Context;
        const { dataloaders } = rawContext;
        let userSubscribedToLoader = dataloaders.get(info.fieldNodes);

        if (!userSubscribedToLoader) {
          userSubscribedToLoader = new DataLoader(batchUserSubscribedTo);
          dataloaders.set(info.fieldNodes, userSubscribedToLoader);
        }

        return userSubscribedToLoader?.load(id);
      },
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, _, context, info) => {
        const rawContext = context as Context;
        const { dataloaders } = rawContext;
        let subscribedToUserLoader = dataloaders.get(info.fieldNodes);

        if (!subscribedToUserLoader) {
          subscribedToUserLoader = new DataLoader(batchSubscribedToUser);
          dataloaders.set(info.fieldNodes, subscribedToUserLoader);
        }

        return subscribedToUserLoader?.load(id);
      },
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
