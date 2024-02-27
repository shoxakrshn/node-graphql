import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { MemberTypeId as MemberTypeEnum } from '../../../member-types/schemas.js';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberTypeEnum.BASIC]: { value: MemberTypeEnum.BASIC },
    [MemberTypeEnum.BUSINESS]: { value: MemberTypeEnum.BUSINESS },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  description: 'This represents a member type',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});
