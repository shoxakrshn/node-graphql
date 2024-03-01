import { GraphQLList, GraphQLNonNull } from 'graphql';
import { Args, Context } from '../../types/types.js';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from './profile-type.js';

export const ProfileQueries = {
  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: (_parent, _args, { prisma }: Context) => prisma.profile.findMany(),
  },

  profile: {
    type: ProfileType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }: Args, { prisma }: Context) =>
      await prisma.profile.findUnique({
        where: { id },
      }),
  },
};
