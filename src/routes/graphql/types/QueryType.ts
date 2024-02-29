import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserType } from './model/UserType.js';
import prisma from './prisma.js';
import { UUIDType } from './model/uuid.js';
import { Args, Context } from './model/ModelTypes.js';
import { MemberType, MemberTypeId } from './model/MemberType.js';
import { ProfileType } from './model/ProfileType.js';
import { PostType } from './model/PostType.js';
import DataLoader from 'dataloader';
import { batchUsersByIds } from '../loaders/userLoader.js';

export const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: () => prisma.user.findMany(),
    },

    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: Args, context, info) => {
        const rawContext = context as Context;
        const { dataloaders } = rawContext;
        let userLoader = dataloaders.get(info.fieldNodes);

        if (!userLoader) {
          userLoader = new DataLoader(batchUsersByIds);
          dataloaders.set(info.fieldNodes, userLoader);
        }

        return userLoader?.load(id);
      },
    },

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: () => prisma.memberType.findMany(),
    },

    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (_, { id }: Args) =>
        await prisma.memberType.findUnique({
          where: { id },
        }),
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: () => prisma.profile.findMany(),
    },

    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: Args) =>
        await prisma.profile.findUnique({
          where: { id },
        }),
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: () => prisma.post.findMany(),
    },

    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: Args) =>
        await prisma.post.findUnique({
          where: { id },
        }),
    },
  }),
});
