import { PrismaClient } from '@prisma/client';
import { User } from '../types/model/ModelTypes.js';
import DataLoader from 'dataloader';

export const batchUsersByIds =
  (prisma: PrismaClient) => async (userIds: readonly unknown[]) => {
    const ids = userIds as string[];
    const users: User[] = await prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const membersMap = new Map(users.map((user) => [user.id, user]));
    return ids.map((id) => membersMap.get(id));
  };

export const createUserLoader = (prisma: PrismaClient) =>
  new DataLoader(batchUsersByIds(prisma));
