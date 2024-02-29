import { GraphQLEnumType } from 'graphql';
import { MemberTypeId as MemberTypeEnum } from '../../member-types/schemas.js';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberTypeEnum.BASIC]: { value: MemberTypeEnum.BASIC },
    [MemberTypeEnum.BUSINESS]: { value: MemberTypeEnum.BUSINESS },
  },
});
