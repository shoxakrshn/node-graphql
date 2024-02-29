import DataLoader from 'dataloader';
import { Member } from '../types/model/ModelTypes.js';
import { PrismaClient } from '@prisma/client';

export const batchMemberTypeByUserIds =
  (prisma: PrismaClient) => async (userIds: readonly unknown[]) => {
    const ids = userIds as string[];
    const members: Member[] = await prisma.memberType.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const membersMap = new Map(members.map((member) => [member.id, member]));
    return ids.map((id) => membersMap.get(id));
  };

export const createMemeberTypeLoader = (prisma: PrismaClient) =>
  new DataLoader(batchMemberTypeByUserIds(prisma));
