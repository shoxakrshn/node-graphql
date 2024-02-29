import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { MemberTypeId } from '../../types/memberTypeId.js';

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  description: 'This represents a member type',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});
