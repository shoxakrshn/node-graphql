import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType } from './MemberType.js';
import prisma from '../prisma.js';
import { Profile } from './ModelTypes.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'This represents a profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberType },

    memberType: {
      type: MemberType,
      resolve: async (parent: Profile) =>
        await prisma.memberType.findUnique({
          where: { id: parent.memberTypeId },
        }),
    },
  }),
});
