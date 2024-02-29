import { GraphQLList, GraphQLNonNull } from 'graphql';
import { Args, Context } from '../../types/types.js';
import { UUIDType } from '../../types/uuid.js';
import { UserType } from './user-type.js';

export const UserQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve: (_parent, _args, { prisma }: Context) => prisma.user.findMany(),
  },

  user: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }: Args, { prisma }: Context) =>
      await prisma.user.findUnique({
        where: { id },
      }),
  },
};
