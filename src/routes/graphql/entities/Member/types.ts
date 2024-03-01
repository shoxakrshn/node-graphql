import { MemberTypeId } from '../../../member-types/schemas.js';

export type Member = {
  id: MemberTypeId | string;
  discount: number;
  postsLimitPerMonth: number;
};
