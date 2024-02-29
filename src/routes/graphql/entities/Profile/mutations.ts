import { GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import {
  ProfileType,
  CreateProfileInputType,
  ChangeProfileInputType,
} from './profile-type.js';
import { Args, Context } from '../../types/types.js';
import { CreateProfile, ChangeProfile } from './types.js';

export const ProfileMutations = {
  createProfile: {
    type: ProfileType,
    description: 'Create a profile',
    args: {
      dto: { type: new GraphQLNonNull(CreateProfileInputType) },
    },
    resolve: async (_, { dto }: CreateProfile, { prisma }: Context) =>
      await prisma.profile.create({ data: dto }),
  },

  deleteProfile: {
    type: GraphQLBoolean,
    description: 'Delete a profile',
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }: Args, { prisma }: Context) => {
      await prisma.profile.delete({ where: { id } });
      return null;
    },
  },

  changeProfile: {
    type: ProfileType,
    description: 'Change a profile',
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
    },
    resolve: async (_, { id, dto }: ChangeProfile, { prisma }: Context) =>
      await prisma.profile.update({
        where: { id },
        data: dto,
      }),
  },
};
