import { MemberTypeId } from '../../../member-types/schemas.js';
import { Args } from '../../types/types.js';

export type Profile = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: MemberTypeId | string;
};

export type CreateProfile = {
  dto: Omit<Profile, 'id'>;
};

export type ChangeProfile = Args & {
  dto: Omit<Profile, 'id, userId'>;
};
