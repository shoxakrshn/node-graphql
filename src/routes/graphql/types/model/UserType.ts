import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './ProfileType.js';
import prisma from '../prisma.js';
import { PostType } from './PostType.js';
import { User } from './ModelTypes.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async ({ id }: User) =>
        await prisma.profile.findUnique({
          where: { userId: id },
        }),
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User) =>
        await prisma.post.findMany({
          where: { authorId: id },
        }),
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User) => {
        const authors = await prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: id },
          select: { author: true },
        });

        return authors.map(({ author }) => author);
      },
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User) => {
        const subscribers = await prisma.subscribersOnAuthors.findMany({
          where: { authorId: id },
          select: { subscriber: true },
        });

        return subscribers.map(({ subscriber }) => subscriber);
      },
    },
  }),
});
