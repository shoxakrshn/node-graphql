import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType, MemberTypeId } from './MemberType.js';
import prisma from '../prisma.js';
import { Context, Profile } from './ModelTypes.js';
import { batchMemberTypeByUserIds } from '../../loaders/membersLoader.js';
import DataLoader from 'dataloader';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'This represents a profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },

    memberType: {
      type: MemberType,
      resolve: async (parent: Profile, _, context, info) => {
        const rawContext = context as Context;
        const { dataloaders } = rawContext;
        let memberTypeLoader = dataloaders.get(info.fieldNodes);

        if (!memberTypeLoader) {
          memberTypeLoader = new DataLoader(batchMemberTypeByUserIds);
          dataloaders.set(info.fieldNodes, memberTypeLoader);
        }

        return memberTypeLoader?.load(parent.memberTypeId);
      },
    },
  }),
});

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
  }),
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
  }),
});
