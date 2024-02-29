import DataLoader from 'dataloader';
import prisma from '../types/prisma.js';
import { Profile } from '../types/model/ModelTypes.js';

export const batchProfilesByUserIds = async (userIds: readonly unknown[]) => {
  const ids = userIds as string[];
  const profiles: Profile[] = await prisma.profile.findMany({
    where: {
      userId: {
        in: ids,
      },
    },
  });

  const profileMap = new Map(profiles.map((profile) => [profile.userId, profile]));
  const result = ids.map((id) => profileMap.get(id));

  return result;
};
