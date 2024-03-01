import { GraphQLList, GraphQLNonNull } from 'graphql';
import { Args, Context } from '../../types/types.js';
import { MemberType } from './member-type.js';
import { MemberTypeId } from '../../types/memberTypeId.js';

export const MemberQueries = {
  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: (_, _args, { prisma }: Context) => prisma.memberType.findMany(),
  },

  memberType: {
    type: MemberType,
    args: {
      id: { type: new GraphQLNonNull(MemberTypeId) },
    },
    resolve: async (_, { id }: Args, { prisma }: Context) =>
      await prisma.memberType.findUnique({
        where: { id },
      }),
  },
};
