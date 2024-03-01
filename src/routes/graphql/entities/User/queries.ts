import { GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';
import { Args, Context } from '../../types/types.js';
import { UUIDType } from '../../types/uuid.js';
import { UserType } from './user-type.js';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { Author, Subscription } from './types.js';

export const UserQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (
      _parent,
      _args,
      { prisma, loaders: { userSubscribedToLoader, subscribedToUser } }: Context,
      info: GraphQLResolveInfo,
    ) => {
      const parsedResolveInfoFragment = parseResolveInfo(info) as ResolveTree;
      const { fields } = simplifyParsedResolveInfoFragmentWithType(
        parsedResolveInfoFragment,
        info.returnType,
      );

      const subs = 'subscribedToUser' in fields;
      const authors = 'userSubscribedTo' in fields;

      const users = await prisma.user.findMany({
        include: {
          subscribedToUser: subs,
          userSubscribedTo: authors,
        },
      });

      if (subs || authors) {
        const userMap = new Map<string, Subscription | Author>(
          users.map((user) => [user.id, user]),
        );

        users.forEach((user) => {
          if (subs) {
            subscribedToUser.prime(
              user.id,
              user.subscribedToUser.map(
                ({ subscriberId }) => userMap.get(subscriberId) as Subscription,
              ),
            );
          }

          if (authors) {
            userSubscribedToLoader.prime(
              user.id,
              user.userSubscribedTo.map(
                ({ authorId }) => userMap.get(authorId) as Author,
              ),
            );
          }
        });
      }

      return users;
    },
  },

  user: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }: Args, { prisma }: Context) => {
      return await prisma.user.findUnique({
        where: { id },
      });
    },
  },
};
