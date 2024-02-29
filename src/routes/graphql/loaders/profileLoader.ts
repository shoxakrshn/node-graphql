import DataLoader from 'dataloader';
import { Profile } from '../types/model/ModelTypes.js';
import { PrismaClient } from '@prisma/client';

export const batchProfilesByUserIds =
  (prisma: PrismaClient) => async (userIds: readonly unknown[]) => {
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

export const createProfileLoader = (prisma: PrismaClient) =>
  new DataLoader(batchProfilesByUserIds(prisma));
